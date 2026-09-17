const Chat = require('../models/chat.model');
const { getSupportReply } = require('../services/ai.service');
const Ride = require('../models/ride.model');

async function handleChat({ requester, userType, message, rideId }) {
  let chat = await Chat.findOne({ userId: requester._id, status: 'open' });
  if (!chat) {
    chat = new Chat({ userId: requester._id, userType, rideId, messages: [] });
  }

  chat.messages.push({ role: 'user', content: message });

  let userContext = {};
  if (rideId) {
    const ride = await Ride.findById(rideId);
    if (ride) {
      userContext = {
        pickup: ride.pickup,
        destination: ride.destination,
        fare: ride.fare,
        status: ride.status,
        vehicleType: ride.vehicleType,
        distanceMeters: ride.distance,
        durationSeconds: ride.duration
      };
    }
  }

  const reply = await getSupportReply({ history: chat.messages, userContext });

  chat.messages.push({ role: 'assistant', content: reply });
  await chat.save();

  return { reply, chatId: chat._id };
}

async function sendUserMessage(req, res) {
  try {
    const { message, rideId } = req.body;
    const result = await handleChat({ requester: req.user, userType: 'User', message, rideId });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong', error: err.message });
  }
}

async function sendCaptainMessage(req, res) {
  try {
    const { message, rideId } = req.body;
    const result = await handleChat({ requester: req.captain, userType: 'Captain', message, rideId });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong', error: err.message });
  }
}

module.exports = { sendUserMessage, sendCaptainMessage };