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
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
    },
    phone: {
        type: String,
        required: [true, "Please enter your phone number"],
        unique: true
    }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;