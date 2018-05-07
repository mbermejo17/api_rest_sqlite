const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.UserAdd = (req, res, next) => {
    User
        .Find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res
                    .status(409)
                    .json({ message: "Mail exists" });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res
                            .status(500)
                            .json({ error: err });
                    } else {
                        const user = new User({
                            _id: new mongoose
                                .Types
                                .ObjectId(),
                            email: req.body.email,
                            password: hash
                        });
                        user
                            .save()
                            .then(result => {
                                console.log(result);
                                res
                                    .status(201)
                                    .json({ message: "User created" });
                            })
                            .catch(err => {
                                console.log(err);
                                res
                                    .status(500)
                                    .json({ error: err });
                            });
                    }
                });
            }
        });
};

exports.UserLogin = (req, res, next) => {
    User.Find(`SELECT UserName, UserPasswd, UserRole FROM Users WHERE UPPER(UserName) = '${req.body.username.toUpperCase()}'`, (status, data) => {
        if (status) {
            console.log(status);
            res.status(500).json({ "status": 'FAIL', "message": status });
        } else {
            if (data) {
                //bcrypt.compare(req.body.password, data.UserPasswd, (err, result) => {
                if (req.body.userpasswd === data.UserPasswd) {
                    /* const token = jwt.sign({
                        UserName: data.UserName,
                        UserId: data._id
                    }, process.env.JWT_KEY, { expiresIn: "1h" }); */
                    const token = jwt.sign({
                        UserName: data.UserName,
                        UserId: data._id
                    }, 'qazWsx$1', { expiresIn: "1h" });
                    return res.status(200).json({ "status": 'OK', "message": { "UserName": data.UserName, "Token": token, "Role": data.UserRole } });
                } else {
                    return res.status(401).json({ "status": 'FAIL', "message": "Auth failed" });
                }
            } else {
                return res.status(401).json({ "status": 'FAIL', "message": "Auth failed" });
            }
        }
    });
};

exports.UserDelete = (req, res, next) => {
    User
        .remove({ _id: req.params.userId })
        .exec()
        .then(result => {
            res
                .status(200)
                .json({ message: "User deleted" });
        })
        .catch(err => {
            console.log(err);
            res
                .status(500)
                .json({ error: err });
        });
};

exports.GetUserAll = (req, res, next) => {
    User.All((err, data) => {
        if (err) {
            console.log(err);
            res
                .status(500)
                .json({ "status": "FAIL", "message": err });
        } else {
            res
                .status(200)
                .json({ "status": "OK", "message": data });
        }
    });
};

exports.GetUserByName = (req, res, next) => {
    User.FindByName(req.params.userName, (err, data) => {
        if (err) {
            console.log(err);
            res
                .status(500)
                .json({ "status": "FAIL", "message": err });
        } else {
            res
                .status(200)
                .json({ "status": "OK", "message": data });
        }
    });
};

exports.GetUserById = (req, res, next) => {
    User.FindById(req.params.userId, (err, data) => {
        if (err) {
            console.log(err);
            res
                .status(500)
                .json({ "status": "FAIL", "message": err });
        } else {
            res
                .status(200)
                .json({ "status": "OK", "message": data });
        }
    });
};