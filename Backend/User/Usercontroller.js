const User = require('./Usermodel');
const bcrypt = require('bcrypt');


exports.registerUser = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            phone: req.body.phone
        });
        const user = await newUser.save();
        res.status(201).send('User has been created!');
        res.json(user);
    }   
    catch (err) {
        res.status(500).send(err.message);
    }};

exports.loginUser = async (req, res, next) => {
    try {
        const user = await user.findone({email: req.body.email});
        if(!user) {
            res.status(400).send('User not found!');

            const validPassword = await bcrypt.compare(req.body.password, user.password);
            if(!validPassword) {
                res.status(400).send('Incorrect password!');
            }
            res.status(200).send('Login successful!');
        }
    }
    catch (err) {
        res.status(500).send(err.message);
    }};

exports.logoutUser = async (req, res, next) => {
    try {
        res.status(200).send('Logout successful!');
    }
    catch (err) {
        res.status(500).send(err.message);
    }};

exports.updateUser = async (req, res, next) => {
    if (req.body.userId === req.params.id) {
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            }, {new: true});
            res.status(200).send(updatedUser);
        }
        catch (err) {
            res.status(500).send(err.message);
        }}
        else {
            res.status(401).send('You can only update your account!');
        }
    };

exports.deleteUser = async (req, res, next) => {
    if (req.body.userId === req.params.id) {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).send('Account has been deleted!');
        }
        catch (err) {
            res.status(500).send(err.message);
        }}
        else {
            res.status(401).send('You can only delete your account!');
        }
    };

exports.getUsers = async (req, res, next) => {
    try {
        const users = req.userId;
        res.status(200).send(users);
    } 
    catch (err) {
        res.status(500).send(err.message);
    }};
