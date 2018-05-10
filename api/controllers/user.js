const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const md5 = require('js-md5');
const Base64 = require('js-base64').Base64;
const config = require('../../config/config.json');
const JWT_KEY = config.jwtKey;


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
    console.log(req.query);
    User.Find(`SELECT UserName, UserPasswd, UserRole FROM Users WHERE UPPER(UserName) = '${req.body.username.toUpperCase()}'`, (status, data) => {
        if (status) {
            console.log(status);
            res.status(500).json({ "status": 'FAIL', "message": status });
        } else {
            if (data) {
                //bcrypt.compare(req.body.password, data.UserPasswd, (err, result) => {
                //console.log(Base64.encode(req.body.userpasswd));     
                //console.log(Base64.decode(data.UserPasswd));  
                if (Base64.decode(req.body.userpasswd) === data.UserPasswd) {
                    /* const token = jwt.sign({
                        UserName: data.UserName,
                        UserId: data._id
                    }, process.env.JWT_KEY, { expiresIn: "1h" }); */
                    const token = jwt.sign({
                        UserName: data.UserName,
                        UserId: data._id
                    }, JWT_KEY, { expiresIn: "10min" });
                    return res.status(200).json({
                        "status": 'OK',
                        "message": {
                            "UserName": data.UserName,
                            "Token": token,
                            "Role": data.UserRole,
                            "wssURL": config.wssURL
                        }
                    });
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
    User.Remove(req.params.userId, (err, data) => {
        if (err) {
            res.status(200).json({ message: "User deleted" });
        } else {
            console.log(err);
            res.status(500).json({ error: err });
        }
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
            let jsonResult = '';
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