const http = require('http');
const app = require('./app')
const { initializeSocket } = require('./socket');
const supportRoutes = require('./routes/support.routes');
app.use('/api/support', supportRoutes);

const server = http.createServer(app);
initializeSocket(server);

const port = process.env.PORT || 4000;

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});