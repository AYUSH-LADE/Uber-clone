const mongoose = require('mongoose');

function ConnectToDb() {
    mongoose.connect(process.env.DB_Connect)
        .then(() => {
            console.log('Connected to MongoDB');
        })
        .catch(err => console.log(err));
}

module.exports = ConnectToDb;