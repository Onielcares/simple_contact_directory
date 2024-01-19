const express = require('express');
const Usercontroller = require('./Usercontroller.js');

const router = express.Router();

router
.route('/')
.get(Usercontroller.getUsers);

router
.route('/:id')
.put(Usercontroller.updateUser)
.delete(Usercontroller.deleteUser);

router.post('/register', Usercontroller.registerUser);
router.post('/login', Usercontroller.loginUser);
router.post('/logout', Usercontroller.logoutUser);


module.exports = router;