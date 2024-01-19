const User = require('./Usermodel');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


exports.registerUser = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            phonenumber: req.body.phonenumber
        });
        const user = await newUser.save();
        res.status(200).json({
            status: 'success',
            data: {
                user
            }
        })
    }   
    catch (err) {
        res.status(500).send(err.message);
    }};

exports.loginUser = async (req, res, next) => {
    try {
        const user = await User.findOne({email: req.body.email});

        if(!user) {
            res.status(400).json({
                status: 'error',
                message: 'Please enter correct Email Address!',
                data: null});
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);
            if(!validPassword) {
               return res.status(400).json({
                    status: 'error',
                    message: 'Please enter correct Password!',
                    data: null });
            }
            res.status(200).json({
                status: 'success',
                data: {
                    username: user.username,
                    email: user.email,
                }
            })
        }

    catch (err) {
        res.status(500).send(err.message);
    }};

exports.logoutUser = async (req, res, next) => {
    try {
        res.status(200).json({
            status: 'success',
            message: 'User logged out successfully!',
            data: null
        })
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
