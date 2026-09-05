const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minLength: [3, 'First name must be of minimum 3 characters long'],
        },
        lastname: {
            type: String,
            minLength: [3, 'Last name must be at least 3 characters long']
        }
    },

    email: {
        type: String,
        required: true,
        unique: true,
        minLength: [5, 'Email must be of at least 5 characters long']
    },

    password: {
        type: String,
        required: true,
        select: false
    },

    socketID: {
        type: String
    }
})

userSchema.methods.generateAuthtoken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
    return token;
}

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;