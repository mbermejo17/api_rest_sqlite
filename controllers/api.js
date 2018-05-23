const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const md5 = require('js-md5');
const Base64 = require('js-base64').Base64;
const config = require('../config/config.json');
const JWT_KEY = config.jwtKey;


const User = require("../models/user");

/**
 * @api {post} /api/user
 * @apiName UserAdd
 * @apiGroup User
 * @apiVersion  1.0.0
 * 
 * 
 * @apiParam  {String} paramName description
 * 
 * @apiSuccess (200) {type} name description
 * 
 * @apiParamExample  {type} Request-Example:
 * {
 *     property : value
 * }
 * 
 * 
 * @apiSuccessExample {type} Success-Response:
 * {
 *     property : value
 * }
 * 
 * 
 */

exports.UserAdd = (req, res, next) => {
    let passwd = Base64.decode(req.body.userpasswd);
    let user = req.body.username.replace(/^([a-z\u00E0-\u00FC])|\s+([a-z\u00E0-\u00FC])/g, function ($1) {
        return $1.toUpperCase();
    });
    console.log(user);
    let userData = {
        username: user,
        password: passwd,
        userrole: req.body.userrole
    };
    User.Add(userData, (err, data) => {
        console.log(err, data);
    });
    /*  User
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
         }); */
};

/**
 * 
 * @api {post} /api/user/login
 * @apiName UserLogin
 * @apiGroup User
 * @apiVersion  1.0.0
 * 
 * 
 * @apiParam  {String} paramName description
 * 
 * @apiSuccess (200) {type} name description
 * 
 * @apiParamExample  {type} Request-Example:
 * {
 *     property : value
 * }
 * 
 * 
 * @apiSuccessExample {type} Success-Response:
 * {
 *     property : value
 * }
 * 
 * 
 */
exports.UserLogin = (req, res, next) => {
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
                    let wsPath = (data.UserRole === 'assistant') ? config.wssURL + '/room' : config.wssURL + '/client';
                    res.cookie('sessionId', Base64.encode(data.UserName), { maxAge: 900000 });
                    return res.status(200).json({
                        "status": 'OK',
                        "message": {
                            "UserName": data.UserName,
                            "Token": token,
                            "Role": data.UserRole,
                            "wssURL": wsPath
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

/**
 * 
 * @api {delete} /api/user/:id
 * @apiName ApiUserDelete
 * @apiGroup User
 * @apiVersion  1.0.0
 * 
 * 
 * @apiParam  {String} paramName description
 * 
 * @apiSuccess (200) {type} name description
 * 
 * @apiParamExample  {type} Request-Example:
 * {
 *     property : value
 * }
 * 
 * 
 * @apiSuccessExample {type} Success-Response:
 * {
 *     property : value
 * }
 * 
 * 
 */
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

/**
 * 
 * @api {get} /api/user
 * @apiName GetAllUsers
 * @apiGroup User
 * @apiVersion  1.0.0
 * 
 * 
 * @apiParam  {String} paramName description
 * 
 * @apiSuccess (200) {type} name description
 * 
 * @apiParamExample  {type} Request-Example:
 * {
 *     property : value
 * }
 * 
 * 
 * @apiSuccessExample {type} Success-Response:
 * {
 *     property : value
 * }
 * 
 * 
 */
exports.GetAllUsers = (req, res, next) => {
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

/**
 * 
 * @api {get} /api/user/:name
 * @apiName GetUserByName
 * @apiGroup User
 * @apiVersion  1.0.0
 * 
 * 
 * @apiParam  {String} paramName description
 * 
 * @apiSuccess (200) {type} name description
 * 
 * @apiParamExample  {type} Request-Example:
 * {
 *     property : value
 * }
 * 
 * 
 * @apiSuccessExample {type} Success-Response:
 * {
 *     property : value
 * }
 * 
 * 
 */
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

/**
 * 
 * @api {get} /api/user/:id
 * @apiName GetUserById
 * @apiGroup User
 * @apiVersion  1.0.0
 * 
 * 
 * @apiParam  {String} paramName description
 * 
 * @apiSuccess (200) {type} name description
 * 
 * @apiParamExample  {type} Request-Example:
 * {
 *     property : value
 * }
 * 
 * 
 * @apiSuccessExample {type} Success-Response:
 * {
 *     property : value
 * }
 * 
 * 
 */

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