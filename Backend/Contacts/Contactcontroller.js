const Contact = require('./Contactmodel.js');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadDir = path.join(__dirname, '../uploads');

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const prefix = 'custom-prefix-';
        const fieldname = file.fieldname || 'default';
        const imagename = `${prefix}${fieldname}-${Date.now()}${path.extname(file.originalname)}`
        cb(null, imagename);
    }
});

exports.upload = multer({ storage: storage });

exports.saveContact = async (req, res, next) => {
    try {
    const image = req.file ? req.file.filename: null;

    const newContact = new Contact({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phonenumber: req.body.phonenumber,
        image: image
    });
    const contact = await newContact.save();
    res.status(200).json({
        status: 'success',
        message: 'Contact saved successfully',
        data: {
            contact
        }
    });
}
catch (err) {
    if (err.name === 'ValidationError') {
        const errors = Object.values(err.errors).map(el => el.message);
        return res.status(400).json({
            status: 'fail',
            message: 'Invalid data',
            errors
        });
    }
    res.status(500).json({
        status: 'error',
        message: 'Internal server error',
        error: err.message
    });
}
};

exports.getContact = async (req, res, next) => {
        try {
            const searchQuery = req.query.search;
            if (searchQuery) {
                const regex = new RegExp(searchQuery, 'i'); 
                const searchedContacts = await Contact.find({
                    $or: [
                        { firstname: regex },
                        { lastname: regex },
                        { phonenumber: regex },
                        { email: regex },
                    ],
                });
    
                const count = searchedContacts.length;
    
                searchedContacts.forEach(async contact => {
                    contact.views = (contact.views || 0) + 1;
                    await contact.save();
                });
    
                res.status(200).json({
                    status: 'success',
                    data: {
                        count,
                        contacts: searchedContacts,
                    },
                });
            } else {
                const allContacts = await Contact.find();
                allContacts.forEach(async contact => {
                    contact.views = (contact.views || 0) + 1;
                    await contact.save();
                });
    
                res.status(200).json({
                    status: 'success',
                    data: {
                        count: allContacts.length,
                        contacts: allContacts,
                    },
                });
            }
        } catch (err) {
            res.status(500).send(err.message);
        }
    };

exports.updateContact = async (req, res, next) => {
    try {
        const contact = await Contact.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );
        res.status(200).json({
            status: 'success',
            message: 'Contact updated successfully',
            data: {
                contact
            }
        });
    }
    catch (err) {
        res.status(500).send(err.message);
    }
};

exports.deleteContact = async (req, res, next) => {
    try {
        await Contact.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status: 'success',
            message: 'Contact deleted successfully',
            data: null
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({  
            status: 'Error',
            message: 'Something went wrong',
            data: null
        });
    }
}