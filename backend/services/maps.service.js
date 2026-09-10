const axios = require('axios');
const captainModel = require('../models/captain.model');

const API_KEY = process.env.GOOGLE_MAPS_API_KEY;

module.exports.getAddressCoordinate = async (address) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${API_KEY}`;
    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            const location = response.data.results[0].geometry.location;
            return {
                ltd: location.lat,
                lng: location.lng
            };
        }
        throw new Error('Unable to fetch coordinates for the given address');
    } catch (err) {
        throw err;
    }
};

module.exports.getDistanceTime = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error('Origin and destination are required');
    }

    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${API_KEY}`;

    const response = await axios.get(url);
    if (response.data.status !== 'OK') {
        throw new Error('Unable to fetch distance and time');
    }
    const element = response.data.rows[0].elements[0];
    if (element.status !== 'OK') {
        throw new Error('No route found between the given locations');
    }
    return element; // { distance: {text, value}, duration: {text, value} }
};

module.exports.getAutoCompleteSuggestions = async (input) => {
    if (!input) {
        throw new Error('Query is required');
    }

    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${API_KEY}`;
    const response = await axios.get(url);
    if (response.data.status !== 'OK' && response.data.status !== 'ZERO_RESULTS') {
        throw new Error('Unable to fetch suggestions');
    }
    return response.data.predictions.map(p => p.description);
};

module.exports.getCaptainsInTheRadius = async (ltd, lng, radius) => {
    // radius in km, naive lat/lng bounding-box search
    const captains = await captainModel.find({
        'location.latitude': { $gte: ltd - (radius / 111), $lte: ltd + (radius / 111) },
        'location.longitude': { $gte: lng - (radius / 111), $lte: lng + (radius / 111) },
        status: 'active'
    });
    return captains;
};
