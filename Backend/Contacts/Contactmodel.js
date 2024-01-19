const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, "Please enter your firstname"],  
    },
    lastname: {
        type: String,
        required: [true, "Please enter your lastname"],
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
    },
    phonenumber: {
        type: String,
        required: [true, "Please enter your phone number"],
    },
    image: {
        type: String,
        required: [true, "Please enter your image"],
    },
    viewCount: {
        type: Number,
        default: 0
    }

});

const Contact = mongoose.model('Contact', ContactSchema);
module.exports = Contact;