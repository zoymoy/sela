const os = require("os");
const fs = require("fs");
const myCache = require("../utils/mcache.js");

exports.list = function(req, res){
    res.statusCode = 202;
    res.json({});

    // Get the current timestamp
    const timestamp = Math.floor(Date.now() / 1000);

    // Store the product in memory
    req.body.timestamp = timestamp;
    myCache.set(req.body.productId, req.body, 10000);

    let count = 0;
    let fileSuffix = 0;
    createFile(0);

    function createFile() {
        let fileName = timestamp + '_' + fileSuffix + '.log';
        let folder = '/Users/yoav/Downloads/sela/';
        // let folder = '/tmp/repricer/results/';
        let path = folder + fileName;

        if (fs.existsSync(path)) {
            // The file exists
            let i;
            require('fs').createReadStream(path)
                .on('data', function (chunk) {
                    for (i = 0; i < chunk.length; ++i)
                        if (chunk[i] === 10) count++;
                })
                .on('end', function () {
                    if (count >= 10) {
                        // Create a new log file
                        fileSuffix += Math.floor(count / 10);
                        count = 0;
                        createFile();
                    } else {
                        // Append to the existing log file
                        writeToLog();
                    }
                });
        } else {
            // The file does not exist
            writeToLog();
        }

        function writeToLog() {
            let logFile = fs.createWriteStream(path, {
                flags: "a",
                encoding: "utf-8"
            });
            logFile.write(JSON.stringify(req.body) + os.EOL, null, 'utf8');
        }
    }
};