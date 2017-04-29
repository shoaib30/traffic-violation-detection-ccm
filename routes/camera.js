var express = require('express');
var router = express.Router();
var config = require('../config.js')
var request = require('request')
var async = require('async')
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('local-db.db', 'OPEN_READWRITE | OPEN_CREATE', function (err) {
    if (err) {
        console.log("Error creating DB: " + err)
        return
    }
    console.log("DB Connected")
});


var cameraModuleUrl = config.camera.base_url + ":" + config.camera.port
var imageProcessingUrl = config.image_processor.base_url + ":" + config.image_processor.port
var centralServerUrl = config.central_server.base_url + ":" + config.central_server.port
var centralRequest = config.central_server.reqCred

router.get('/', function (req, res, next) {
    res.send('Camera Communication API');
});

//API to trigger camera
router.get('/trigger-camera', function (req, res, next) {
    //TO-DO respond back with JSON
    /*
    {
        "module":"sensor",
        "timestamp":1486836445
    }
    */
    console.log("Trigger camera at: " + cameraModuleUrl + req.path)
    request(cameraModuleUrl + req.path, function (error, response, body) {
        if (error) {
            console.log("Error Communicating with Camera Module")
            res.send("Error in Camera Module")
        } else if (!error && response.statusCode == 200) {
            /*when camera module responds back with the data
            {
                "module":"camera",
                "timestamp":1486836445,
                "file_name":"file_300795",
                "file_extension":"jpeg"
            }
            */
            var data = JSON.parse(body)
                //TO-DO store data in database
            async.parallel([
                function () {
                    console.log("Response from Camera Module: " + JSON.stringify(data))
                    var url = imageProcessingUrl + "/process-number-plate?fileName=" + data.file_name
                        //console.log("Processor at: " + imageProcessingUrl + "/process-number-plate?fileName=" + data.file_name)
                    request(url, function (error, response, body) {
                        if (error) {
                            console.log("Error processing Image")
                        } else if (!error && response.statusCode == 200) {
                            var data = body
                            console.log("Processed Image: " + data)
                            var serverUrl = centralServerUrl + "/api/node/posts"
                            var reqBody = JSON.parse(JSON.stringify(centralRequest));
                            reqBody.numberPlate = data
                            request({
                                'method': 'POST',
                                'uri': serverUrl,
                                'json': reqBody
                            }, function (err, resp, body) {
                                if (err) {
                                    console.log("Error Communicating with central server")
                                } else if (!err && response.statusCode == 200 ) {
                                    console.log("Data sent to Central server")
                                }
                            })
                        }
                    })
                },
                function () {
                    res.send("Recieved Response")
                }
            ]);

        } else {
            async.parallel([
                function () {
                    console.log("Error: " + response.statusCode)
                },
                function () {
                    res.send("Error in Camera Module")
                }
            ]);
        }
    })
})

module.exports = router;