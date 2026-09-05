const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');
const blacklistTokenModel = require('../models/blacklistToken.model');

module.exports.registerUser = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { fullname, email, password } = req.body;
        const isUserAlreadyExists = await userModel.findOne({ email });
        if (isUserAlreadyExists) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const hashedPassword = await userModel.hashPassword(password);

        const user = await userService.createUser({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password: hashedPassword
        });

        const token = user.generateAuthtoken();

        res.cookie('token', token);

        user.password = undefined; 

        res.status(201).json({ token, user });
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        next(err);
    }
};

module.exports.loginUser = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        const user = await userModel.findOne({ email }).select('+password');

        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = user.generateAuthtoken();

        user.password = undefined; // don't leak hash back to client

        res.status(200).json({ token, user });
    } catch (err) {
        next(err);
    }
}  

module.exports.getUserProfile = async (req, res, next) => {
    res.status(200).json({ user: req.user }); 
}

module.exports.logoutUser = async (req, res, next) => {
    res.clearCookie('token');
    const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    await blacklistTokenModel.create({ token });
    res.status(200).json({ message: 'Logged out successfully' });
}