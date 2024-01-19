const express = require('express');
const Contactcontroller = require('./Contactcontroller.js');

const router = express.Router();

router
.route('/')
.post(Contactcontroller.upload.single('image'), Contactcontroller.saveContact)
.get(Contactcontroller.getContact);

router
.route('/:id')
.put(Contactcontroller.updateContact)
.delete(Contactcontroller.deleteContact);


module.exports = router;
