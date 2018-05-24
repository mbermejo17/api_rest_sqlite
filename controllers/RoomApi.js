const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const md5 = require('js-md5');
const Base64 = require('js-base64').Base64;
const config = require('../config/config.json');
const JWT_KEY = config.jwtKey;


const User = require("../models/user");

/**
 * @api {post} /api/room Room Add
 * @apiName RoomAdd
 * @apiGroup Reomote Rooms
 * @apiVersion  1.0.0
 * 
 * @apiHeader {String} Autohization User token access-key.
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyTmFtZSI6IlBlcGUiLCJpYXQiOjE1MjcxMzg5NzgsImV4cCI6MTUyNzEzOTU3OH0.ov2LdDMDvIQXJMP2_3BEMisfze2KJ4frNdIG-B_M-BA"
 *     }
 * 
 * @apiParam  {String} room  room name
 * 
 * 
 * @apiParamExample  {json} Request-Example:
 * {
 *     "roomname"   : "Room1"
 * }
 * 
 * 
 * @apiSuccessExample {json} Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "status" : "OK",
 *          "message": "Room <name> added added successfuly"
 *      }
 * 
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 409 CONFLICT
 *     {
 *       "status" : "FAIL",
 *       "message": "Room <name> already exists"
 *     }
 */

exports.RoomAdd = (req, res, next) => {
    let passwd = Base64.decode(req.body.userpasswd);
    let room = req.body.username.replace(/^([a-z\u00E0-\u00FC])|\s+([a-z\u00E0-\u00FC])/g, function ($1) {
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
 * @api {delete} /api/room/:id Room Delete
 * @apiName RoomDelete
 * @apiGroup Reomote Rooms
 * @apiVersion  1.0.0
 *
 * @apiHeader {String} Autohization User token access-key.
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyTmFtZSI6IlBlcGUiLCJpYXQiOjE1MjcxMzg5NzgsImV4cCI6MTUyNzEzOTU3OH0.ov2LdDMDvIQXJMP2_3BEMisfze2KJ4frNdIG-B_M-BA"
 *     }
 * 
 *  
 * @apiParam  {number} room id
 * 
 * @apiSuccessExample {json} Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "status" : "OK",
 *          "message": "Room ID <id> deleted successfuly" 
 *      }
 * 
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 NOT FOUND
 *     {
 *       "status" : "FAIL",
 *       "message": "Room ID <id> not found"
 *     }
 */
exports.RoomDelete = (req, res, next) => {
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
 * @api {get} /api/room Get All Rooms
 * @apiName RoomGetAll
 * @apiGroup Reomote Rooms
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
 *                      "RoomName": "Room1",
 *                      "RoomId": 1
 *                     },
 *                    {
 *                      "RoomName": "Room2",
 *                      "RoomId": 2
 *                     },
 *                   ]
 *       }
 * 
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 NOT FOUND
 *     {
 *       "status" : "FAIL",
 *       "message": "No rooms are found"
 *     }
 */
exports.RoomGetAll = (req, res, next) => {
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
 * @api {get} /api/room/:name Get Room by name
 * @apiName GetUserByName
 * @apiGroup Reomote Rooms
 * @apiVersion  1.0.0
 *
 * @apiHeader {String} Autohization User token access-key.
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyTmFtZSI6IlBlcGUiLCJpYXQiOjE1MjcxMzg5NzgsImV4cCI6MTUyNzEzOTU3OH0.ov2LdDMDvIQXJMP2_3BEMisfze2KJ4frNdIG-B_M-BA"
 *     }
 * 
 * @apiParam  {string} name  room name   
 * 
 * @apiSuccessExample {object[]} Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *        "status": "OK",
 *        "message": {
 *                      "RoomName": "Room1",
 *                      "UserId": 1
 *                     }
 *       }
 * 
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 NOT FOUND
 *     {
 *       "status" : "FAIL",
 *       "message": "Room <name> not found"
 *     }
 */
exports.GetRoomByName = (req, res, next) => {
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
 * @api {get} /api/room/:id Get Room by ID
 * @apiName GetRoomById
 * @apiGroup Reomote Rooms
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
 *                      "RoomName": "Room1",
 *                      "UserId": 1
 *                     }
 *       }
 * 
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 NOT FOUND
 *     {
 *       "status" : "FAIL",
 *       "message": "Room ID <id> not found"
 *     }
 */
exports.GetRoomById = (req, res, next) => {
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
