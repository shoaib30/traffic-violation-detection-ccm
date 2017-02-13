var express = require('express');
var router = express.Router();
var config = require('../config.js').camera
var request = require('request')
var async = require('async')
/* GET users listing. */

var cameraModuleUrl = config.base_url + ":" + config.port

router.get('/', function(req, res, next) {
  res.send('Camera Communication API');
});

//API to trigger camera
router.get('/trigger-camera', function(req, res, next)  {
    //TO-DO respond back with JSON
    /*
    {
        "module":"sensor",
        "timestamp":1486836445
    }
    */
    console.log("Trigger camera at: " + cameraModuleUrl + req.path)
    request(cameraModuleUrl + req.path, function (error, response, body) {
        if (error)  {
            console.log("Error Communicating with Camera Module")
            res.send("Error in Camera Module")
        }else if (!error && response.statusCode == 200) {
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
                function()  {
                    console.log("Response from Camera Module")
                },
                function()  {
                    res.send("Recieved Response")
                }
            ]);

        }else{
            async.parallel([
                function()  {
                    console.log("Error: " + response.statusCode)
                },
                function()  {
                    res.send("Error in Camera Module")
                }
            ]);
        }
    })
})

module.exports = router;
