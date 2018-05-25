const jwt = require("jsonwebtoken");
const md5 = require('js-md5');
const Base64 = require('js-base64').Base64;
const config = require('../config/config.json');
const formidable = require('formidable');
const path = require('path');
const JWT_KEY = config.jwtKey;
const util = require('util');
const fs   = require('fs-extra');
const readChunk = require('read-chunk');
const fileType = require('file-type');


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

    var photos = [],
    form = new formidable.IncomingForm();

// Tells formidable that there will be multiple files sent.
form.multiples = true;
// Upload directory for the images
form.uploadDir = path.join(__dirname, 'download');

// Invoked when a file has finished uploading.
form.on('file', function (name, file) {
    // Allow only 3 files to be uploaded.
    if (photos.length === 3) {
        fs.unlink(file.path);
        return true;
    }

    var buffer = null,
        type = null,
        filename = '';

    // Read a chunk of the file.
    buffer = readChunk.sync(file.path, 0, 262);
    // Get the file type using the buffer read using read-chunk
    type = fileType(buffer);

    // Check the file type, must be either png,jpg or jpeg
    if (type !== null && (type.ext === 'png' || type.ext === 'jpg' || type.ext === 'jpeg')) {
        // Assign new file name
        filename = Date.now() + '-' + file.name;

        // Move the file with the new file name
        fs.rename(file.path, path.join(__dirname, 'uploads/' + filename));

        // Add to the list of photos
        photos.push({
            status: true,
            filename: filename,
            type: type.ext,
            publicPath: 'uploads/' + filename
        });
    } else {
        photos.push({
            status: false,
            filename: file.name,
            message: 'Invalid file type'
        });
        fs.unlink(file.path);
    }
});

form.on('error', function(err) {
    console.log('Error occurred during processing - ' + err);
});

// Invoked when all the fields have been processed.
form.on('end', function() {
    console.log('All the request fields have been processed.');
});

// Parse the incoming form fields.
form.parse(req, function (err, fields, files) {
    res.status(200).json(photos);
});
};