let aFiles = [];
let aFields = [];
let form = new formidable.IncomingForm();

// Tells formidable that there will be multiple files sent.
form.multiples = true;
// Upload directory for files
form.uploadDir = path.join(__dirname, '../public/download');
console.log(form.uploadDir);

// Invoked when a file has finished uploading.
form
    .on('field', function(field, value) {
        aFields.push([field, value]);
    })
    .on('file', function(name, file) {
        // Allow only 3 files to be uploaded.
        if (aFiles.length === 3) {
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
        if (type !== null && (type.ext === 'zip' || type.ext === 'tar' || type.ext === '7z')) {
            // Assign new file name
            filename = Date.now() + '-' + file.name;

            // Move the file with the new file name
            fs.rename(file.path, path.join(__dirname, 'public/download/' + filename));

            // Add to the list of photos
            aFiles.push({
                status: true,
                filename: filename,
                type: type.ext,
                publicPath: 'public/download/' + filename
            });
        } else {
            aFiles.push({
                status: false,
                filename: file.name,
                message: 'Invalid file type'
            });
            fs.unlink(file.path);
        }
    })
    .on('progress', function(bytesReceived, bytesExpected) {
        var percent_complete = (bytesReceived / bytesExpected) * 100;
        console.log(percent_complete.toFixed(2));
    })
    .on('error', function(err) {
        console.log('Error occurred during processing - ' + err);
        res.status(200).send('Error occurred during processing - ' + err);
    })

// Invoked when all the fields have been processed.
.on('end', function() {
    console.log('All the request fields have been processed.');
    res.status(200).send('All the request fields have been processed.');
});

// Parse the incoming form fields.
form.parse(req, function(err, fields, files) {
    res.status(200).json(aFiles);
});