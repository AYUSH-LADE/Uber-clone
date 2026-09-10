const express = require('express');
const router = express.Router();
const { query } = require('express-validator');
const mapsController = require('../controllers/maps.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.get('/get-coordinates',
    authMiddleware.authUser,
    query('address').isString().isLength({ min: 3 }),
    mapsController.getCoordinates
);

router.get('/get-distance-time',
    authMiddleware.authUser,
    query('origin').isString().isLength({ min: 3 }),
    query('destination').isString().isLength({ min: 3 }),
    mapsController.getDistanceTime
);

router.get('/get-suggestions',
    authMiddleware.authUser,
    query('input').isString().isLength({ min: 3 }),
    mapsController.getAutoCompleteSuggestions
);

module.exports = router;
