const { validationResult } = require('express-validator');
const rideService = require('../services/ride.service');
const mapsService = require('../services/maps.service');
const rideModel = require('../models/ride.model');
const { sendMessageToSocketId } = require('../socket');

module.exports.createRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { pickup, destination, vehicleType } = req.body;

    try {
        const ride = await rideService.createRide({ user: req.user._id, pickup, destination, vehicleType });
        res.status(201).json(ride);

        // Notify nearby active captains of the new ride request
        const pickupCoordinates = await mapsService.getAddressCoordinate(pickup);
        const captainsInRadius = await mapsService.getCaptainsInTheRadius(pickupCoordinates.ltd, pickupCoordinates.lng, 5);

        const rideWithUser = await rideModel.findOne({ _id: ride._id }).populate('user');

        captainsInRadius.forEach(captain => {
            if (captain.socketID) {
                sendMessageToSocketId(captain.socketID, {
                    event: 'new-ride',
                    data: rideWithUser
                });
            }
        });
    } catch (err) {
        if (!res.headersSent) {
            res.status(500).json({ message: err.message });
        }
    }
};

module.exports.getFare = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { pickup, destination } = req.query;
    try {
        const { fare, distanceTime } = await rideService.getFare(pickup, destination);
        res.status(200).json({ fare, distanceTime });
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

module.exports.confirmRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { rideId } = req.body;
    try {
        const ride = await rideService.confirmRide({ rideId, captain: req.captain });

        if (ride.user.socketID) {
            sendMessageToSocketId(ride.user.socketID, {
                event: 'ride-confirmed',
                data: ride
            });
        }

        res.status(200).json(ride);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

module.exports.startRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { rideId, otp } = req.query;
    try {
        const ride = await rideService.startRide({ rideId, otp, captain: req.captain });

        if (ride.user.socketID) {
            sendMessageToSocketId(ride.user.socketID, {
                event: 'ride-started',
                data: ride
            });
        }

        res.status(200).json(ride);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

module.exports.endRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { rideId } = req.body;
    try {
        const ride = await rideService.endRide({ rideId, captain: req.captain });

        if (ride.user.socketID) {
            sendMessageToSocketId(ride.user.socketID, {
                event: 'ride-ended',
                data: ride
            });
        }

        res.status(200).json(ride);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
