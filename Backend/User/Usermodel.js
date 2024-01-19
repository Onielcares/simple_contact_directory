const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please enter your username"],
        trim: true,
        maxlength: [30, "Name cannot exceed 30 characters"]
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
    },
    phonenumber: {
        type: String,
        required: [true, "Please enter your phone number"],
    }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;