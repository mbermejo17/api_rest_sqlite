const jwt = require("jsonwebtoken");
const md5 = require('js-md5');
const Base64 = require('js-base64').Base64;
const config = require('../config/config.json');
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const JWT_KEY = config.jwtKey;


//const User = require("../models/user");

exports.Index = (req, res, next) => {
    const cookie = req.cookies.sessionId;
    console.log('Mnt:Controller.Index');
    res.status(200).json({
        status: "OK",
        message: "index"
    });
};

exports.Download = (req, res, next) => {
    console.log('Mnt:Controller.Download');
    res.status(200).json({
        status: "OK",
        message: "download"
    });
};

exports.Upload = (req, res, next) => {
    console.log('Mnt:Controller.Upload');

    // create an incoming form object
    var form = new formidable.IncomingForm();

    // specify that we want to allow the user to upload multiple files in a single request
    form.multiples = true;

    // store all uploads in the /uploads directory
    form.uploadDir = path.join(__dirname, 'download');

    // every time a file has been uploaded successfully,
    // rename it to it's orignal name
    form.on('file', function(field, file) {
        console.log(file.name);
        fs.rename(file.path, path.join(form.uploadDir, file.name));
    });

    // log any errors that occur
    form.on('error', function(err) {
        console.log('An error has occured: \n' + err);
    });

    // once all the files have been uploaded, send a response to the client
    form.on('end', function() {
        res.end('success');
    });

    // Upload progress 
    form.on('progress', function(bytesReceived, bytesExpected) {
        var percent_complete = (bytesReceived / bytesExpected) * 100;
        console.log(percent_complete.toFixed(2));
    });

    // parse the incoming request containing the form data
    form.parse(req);
};