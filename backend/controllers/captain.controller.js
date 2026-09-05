const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service');
const { validationResult } = require('express-validator');

module.exports.registerCaptain = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { fullname, email, password, vehicle } = req.body;
        const { color, plate, capacity, vehicleType } = vehicle;

        const isCaptainAlreadyExists = await captainModel.findOne({ email });
        if (isCaptainAlreadyExists) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const hashedPassword = await captainModel.hashPassword(password);

        const captain = await captainService.createCaptain({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password: hashedPassword,
            color,
            plate,
            capacity,
            vehicleType
        });

        const token = captain.generateAuthtoken();

        captain.password = undefined; // don't leak hash back to client

        res.status(201).json({ token, captain });
    } catch (err) {
        next(err);
    }
};