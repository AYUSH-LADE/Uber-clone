const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const captainSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minLength: [3, 'First name must be of minimum 3 characters long'],  
        },
        lastname: {
            type: String,
            required: true,
            minLength: [3, 'Last name must be of minimum 3 characters long'],  
        }
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        minLength: [5, 'Email must be of at least 5 characters long'],
        match: [/\S+@\S+\.\S+/, 'Email is invalid']
    },

    password: {
        type: String,
        required: true,
        select: false
    },

    socketID: {
        type: String
    },

    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },
    
    vehicle: {
      color: {
        type: String,
        required: true,
        minLength: [3, 'Vehicle color must be of at least 3 characters long'],
    },
    plate: {
        type: String,
        required: true,
        minLength: [3, 'Vehicle plate must be of at least 3 characters long'],
    },
    capacity: {
        type: Number,
        required: true,
        min: [1, 'Vehicle capacity must be at least 1'],
    },
    vehicleType: {
        type: String,
        required: true,
        enum: ['car', 'motorcycle', 'auto'],
    }

    },
   location: {
    latitude: {
        type: Number,
   },
   longitude: {
        type: Number,
   }
    }
    })  



    captainSchema.methods.generateAuthtoken = function () {
        const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        return token;
    } 

    captainSchema.methods.comparePassword = async function (password) {
        return await bcrypt.compare(password, this.password);
    }

    captainSchema.statics.hashPassword = async function (password) {
        return await bcrypt.hash(password, 10);
    }


    const captainModel = mongoose.model('Captain', captainSchema);

    module.exports = captainModel;