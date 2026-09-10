const rideModel = require('../models/ride.model');
const mapsService = require('./maps.service');
const crypto = require('crypto');

function getOtp(digits) {
    return crypto.randomInt(Math.pow(10, digits - 1), Math.pow(10, digits)).toString();
}

module.exports.getFare = async (pickup, destination) => {
    if (!pickup || !destination) {
        throw new Error('Pickup and destination are required');
    }

    const distanceTime = await mapsService.getDistanceTime(pickup, destination);

    const baseFare = { auto: 30, car: 50, motorcycle: 20 };
    const perKmRate = { auto: 10, car: 15, motorcycle: 8 };
    const perMinuteRate = { auto: 2, car: 3, motorcycle: 1.5 };

    const distanceKm = distanceTime.distance.value / 1000;
    const durationMin = distanceTime.duration.value / 60;

    const fare = {
        auto: Math.round(baseFare.auto + distanceKm * perKmRate.auto + durationMin * perMinuteRate.auto),
        car: Math.round(baseFare.car + distanceKm * perKmRate.car + durationMin * perMinuteRate.car),
        motorcycle: Math.round(baseFare.motorcycle + distanceKm * perKmRate.motorcycle + durationMin * perMinuteRate.motorcycle)
    };

    return { fare, distanceTime };
};

module.exports.createRide = async ({ user, pickup, destination, vehicleType }) => {
    if (!user || !pickup || !destination || !vehicleType) {
        throw new Error('All fields are required');
    }

    const { fare } = await this.getFare(pickup, destination);

    const ride = await rideModel.create({
        user,
        pickup,
        destination,
        vehicleType,
        fare: fare[vehicleType],
        otp: getOtp(6)
    });

    return ride;
};

module.exports.confirmRide = async ({ rideId, captain }) => {
    if (!rideId) throw new Error('Ride id is required');

    await rideModel.findOneAndUpdate(
        { _id: rideId },
        { status: 'accepted', captain: captain._id }
    );

    const ride = await rideModel.findOne({ _id: rideId })
        .populate('user')
        .populate('captain')
        .select('+otp');

    if (!ride) throw new Error('Ride not found');

    return ride;
};

module.exports.startRide = async ({ rideId, otp, captain }) => {
    if (!rideId || !otp) throw new Error('Ride id and OTP are required');

    const ride = await rideModel.findOne({ _id: rideId }).populate('user').populate('captain').select('+otp');

    if (!ride) throw new Error('Ride not found');
    if (ride.status !== 'accepted') throw new Error('Ride not accepted yet');
    if (ride.otp !== otp) throw new Error('Invalid OTP');

    await rideModel.findOneAndUpdate({ _id: rideId }, { status: 'ongoing' });

    return ride;
};

module.exports.endRide = async ({ rideId, captain }) => {
    if (!rideId) throw new Error('Ride id is required');

    const ride = await rideModel.findOne({ _id: rideId, captain: captain._id }).populate('user').populate('captain');

    if (!ride) throw new Error('Ride not found');
    if (ride.status !== 'ongoing') throw new Error('Ride not ongoing');

    await rideModel.findOneAndUpdate({ _id: rideId }, { status: 'completed' });

    return ride;
};
