const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const md5 = require('js-md5');
const Base64 = require('js-base64').Base64;
const config = require('../config/config.json');
const JWT_KEY = config.jwtKey;


const User = require("../models/user");

/**
 * @api {post} /api/user User Add
 * @apiName UserAdd
 * @apiGroup User
 * @apiVersion  1.0.0
 * 
 * @apiHeader {String} Autohization User token access-key.
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyTmFtZSI6IlBlcGUiLCJpYXQiOjE1MjcxMzg5NzgsImV4cCI6MTUyNzEzOTU3OH0.ov2LdDMDvIQXJMP2_3BEMisfze2KJ4frNdIG-B_M-BA"
 *     }
 * 
 * @apiParam  {String} username Logon user name
 * @apiParam  {String} userpasswd Logon user password 
 * @apiParam  {String} userrole User role 
 * 
 * 
 * @apiParamExample  {json} Request-Example:
 * {
 *     "username"   : "Pepe",
 *     "userpasswd" : "YzljMjQ0ZTQ4Y2FhNjQ1NjE4MzEyNWQ3ZDkzNTlmNGI=",
 *     "userrole"   : "user"
 * }
 * 
 * 
 * @apiSuccessExample {json} Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "status" : "OK",
 *          "message": "User <username> added added successfuly"
 *      }
 * 
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 409 CONFLICT
 *     {
 *       "status" : "FAIL",
 *       "message": "User <username> already exists"
 *     }
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
        if (err) {
            return res
                .status(409)
                .json({ status: "FAIL", message: `User ${userData.username} already exists` });
        } else {
            return res
                .status(200)
                .json({ status: "OK", message: `User ${userData.username} added successfuly` });
        }
    });
};

/**
 * @api {post} /api/user/login User Logon
 * @apiName UserLogin
 * @apiGroup User
 * @apiVersion  1.0.0
 * 
 * @apiParam  {String} username Logon user name
 * @apiParam  {String} userpasswd Logon user password 
 * 
 * 
 * @apiParamExample  {json} Request-Example:
 * {
 *     "username"   : "Pepe",
 *     "userpasswd" : "YzljMjQ0ZTQ4Y2FhNjQ1NjE4MzEyNWQ3ZDkzNTlmNGI="
 * }
 * 
 * 
 * @apiSuccessExample {json} Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "status" : "OK",
 *          "message": {
 *                      "UserName": "Pepe",
 *                      "Token"   :,
 *                      "Role"    : "admin",
 *                      "wssURL"  : "wss://web.com"
 *                     }  
 *      }
 * 
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 UNAUTHORIZED
 *     {
 *       "status" : "FAIL",
 *       "message": "Authorization Fail"
 *     }
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
 * @api {delete} /api/user/:id User Delete
 * @apiName UserDelete
 * @apiGroup User
 * @apiVersion  1.0.0
 *
 * @apiHeader {String} Autohization User token access-key.
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyTmFtZSI6IlBlcGUiLCJpYXQiOjE1MjcxMzg5NzgsImV4cCI6MTUyNzEzOTU3OH0.ov2LdDMDvIQXJMP2_3BEMisfze2KJ4frNdIG-B_M-BA"
 *     }
 * 
 *  
 * @apiParam  {number} username id
 * 
 * @apiSuccessExample {json} Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "status" : "OK",
 *          "message": "User ID <id> deleted successfuly" 
 *      }
 * 
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 NOT FOUND
 *     {
 *       "status" : "FAIL",
 *       "message": "User ID <id> not found"
 *     }
 */
exports.UserDelete = (req, res, next) => {
    User.Remove(req.params.userId, (err, data) => {
        if (err) {
            res.status(200).json({ "status": "OK", "message": `User ID ${req.params.userId} deleted successfuly` });
        } else {
            console.log(err);
            res.status(404).json({ "status": "FAIL", "message": err });
        }
    });
};

/**
 * @api {get} /api/user Get All Users
 * @apiName UserGetAll
 * @apiGroup User
 * @apiVersion  1.0.0
 *
 * @apiHeader {String} Autohization User token access-key.
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyTmFtZSI6IlBlcGUiLCJpYXQiOjE1MjcxMzg5NzgsImV4cCI6MTUyNzEzOTU3OH0.ov2LdDMDvIQXJMP2_3BEMisfze2KJ4frNdIG-B_M-BA"
 *     }
 * 
 *  
 * 
 * @apiSuccessExample {object[]} Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *        "status": "OK",
 *        "message": [
 *                    {
 *                      "UserName": "Pepe",
 *                      "UserId": 1,
 *                      "UserPasswd": "c9c244e48caa6456183125d7d9359f4b",
 *                      "UserRole": "admin"
 *                     },
 *                     {
 *                       "UserName": "Juan",
 *                       "UserId": 2,
 *                       "UserPasswd": "c9c244e48caa6456183125d7d9359f4b",
 *                       "UserRole": "user"
 *                     }
 *                   ]
 *       }
 * 
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 NOT FOUND
 *     {
 *       "status" : "FAIL",
 *       "message": "User ID <id> not found"
 *     }
 */
exports.UserGetAll = (req, res, next) => {
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
 * @api {get} /api/user/:name Get User by name
 * @apiName GetUserByName
 * @apiGroup User
 * @apiVersion  1.0.0
 *
 * @apiHeader {String} Autohization User token access-key.
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyTmFtZSI6IlBlcGUiLCJpYXQiOjE1MjcxMzg5NzgsImV4cCI6MTUyNzEzOTU3OH0.ov2LdDMDvIQXJMP2_3BEMisfze2KJ4frNdIG-B_M-BA"
 *     }
 * 
 * @apiParam  {string} name  user name   
 * 
 * @apiSuccessExample {object[]} Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *        "status": "OK",
 *        "message": {
 *                      "UserName": "Pepe",
 *                      "UserId": 1,
 *                      "UserPasswd": "c9c244e48caa6456183125d7d9359f4b",
 *                      "UserRole": "admin"
 *                     }
 *       }
 * 
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 NOT FOUND
 *     {
 *       "status" : "FAIL",
 *       "message": "User <name> not found"
 *     }
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
 * @api {get} /api/user/:id Get User by ID
 * @apiName GetUserById
 * @apiGroup User
 * @apiVersion  1.0.0
 *
 * @apiHeader {String} Autohization User token access-key.
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyTmFtZSI6IlBlcGUiLCJpYXQiOjE1MjcxMzg5NzgsImV4cCI6MTUyNzEzOTU3OH0.ov2LdDMDvIQXJMP2_3BEMisfze2KJ4frNdIG-B_M-BA"
 *     }
 * 
 * @apiParam  {string} id  user id   
 * 
 * @apiSuccessExample {object[]} Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *        "status": "OK",
 *        "message": {
 *                      "UserName": "Pepe",
 *                      "UserId": 1,
 *                      "UserPasswd": "c9c244e48caa6456183125d7d9359f4b",
 *                      "UserRole": "admin"
 *                     }
 *       }
 * 
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 NOT FOUND
 *     {
 *       "status" : "FAIL",
 *       "message": "User ID <id> not found"
 *     }
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

/**
 * @api {post} /api/user/logoff/:name User Logoff
 * @apiName UserLogoff
 * @apiGroup User
 * @apiVersion  1.0.0
 *
 * @apiHeader {String} Autohization User token access-key.
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyTmFtZSI6IlBlcGUiLCJpYXQiOjE1MjcxMzg5NzgsImV4cCI6MTUyNzEzOTU3OH0.ov2LdDMDvIQXJMP2_3BEMisfze2KJ4frNdIG-B_M-BA"
 *     }
 * 
 * @apiParam  {string} name  user name
 * 
 * @apiSuccessExample {object[]} Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *        "status"  : "OK",
 *        "message" : "User <name> logoff successfuly" 
 *       }
 * 
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 NOT FOUND
 *     {
 *       "status" : "FAIL",
 *       "message": "User <name> not found"
 *     }
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