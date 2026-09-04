const http = require('http');
const app = require('./app')

const server = http.createServer(app);

const port = process.env.PORT || 4000;

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});