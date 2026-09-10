const socketIo = require('socket.io');
const userModel = require('./models/user.model');
const captainModel = require('./models/captain.model');

let io;

function initializeSocket(server) {
    io = socketIo(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        }
    });

    io.on('connection', (socket) => {
        console.log(`Client connected: ${socket.id}`);

        socket.on('join', async ({ userId, userType }) => {
            try {
                if (userType === 'user') {
                    await userModel.findByIdAndUpdate(userId, { socketID: socket.id });
                } else if (userType === 'captain') {
                    await captainModel.findByIdAndUpdate(userId, { socketID: socket.id });
                }
            } catch (err) {
                console.log('join error', err.message);
            }
        });

        socket.on('update-location-captain', async ({ userId, location }) => {
            if (!location || !location.ltd || !location.lng) {
                return socket.emit('error', { message: 'Invalid location data' });
            }
            try {
                await captainModel.findByIdAndUpdate(userId, {
                    location: {
                        latitude: location.ltd,
                        longitude: location.lng
                    }
                });
            } catch (err) {
                console.log('location update error', err.message);
            }
        });

        socket.on('disconnect', () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });
}

function sendMessageToSocketId(socketId, { event, data }) {
    if (io) {
        io.to(socketId).emit(event, data);
    } else {
        console.log('Socket.io not initialized.');
    }
}

module.exports = { initializeSocket, sendMessageToSocketId };
