const captainController = require('../controllers/captain.controller');
const express = require('express');
const router = express.Router();
const {body} = require("express-validator");
const authMiddleware = require('../middleware/auth.middleware');

router.post('/register',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min:3}).withMessage('First name must be atleast 3 characters long'),
    body('fullname.lastname').isLength({min:3}).withMessage('Last name must be atleast 3 characters long'),
    body('password').isLength({min:6}).withMessage('Password must be at least  6 characters long'),
    body('vehicle.color').isLength({min:3}).withMessage('Vehicle color must be atleast 3 characters long'),
    body('vehicle.plate').isLength({min:3}).withMessage('Vehicle plate must be atleast 3 characters long'),
    body('vehicle.capacity').isNumeric().withMessage('Vehicle capacity must be a number'),
    body('vehicle.vehicleType').isIn(['car', 'motorcycle', 'auto']).withMessage('Invalid vehicle type')
],
    captainController.registerCaptain
);

router.post('/login',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min:6}).withMessage('Password must be at least  6 characters long')
],
    captainController.loginCaptain
);

router.get('/profile',authMiddleware.authCaptain ,captainController.getCaptainProfile);
router.patch('/update-status',authMiddleware.authCaptain ,captainController.updateStatus);
router.get('/logout',authMiddleware.authCaptain ,captainController.logoutCaptain);
module.exports = router;