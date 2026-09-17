const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  role: { type: String, enum: ['user', 'assistant'], required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const chatSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, refPath: 'userType', required: true },
  userType: { type: String, enum: ['User', 'Captain'], required: true },
  rideId: { type: mongoose.Schema.Types.ObjectId, ref: 'Ride' },
  messages: [messageSchema],
  status: { type: String, enum: ['open', 'resolved', 'escalated'], default: 'open' }
}, { timestamps: true });

module.exports = mongoose.model('Chat', chatSchema);