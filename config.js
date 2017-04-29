//configuration file to hold all variables for Central Controller

var config = {};

config.camera = {};
config.central_controller = {}
config.image_processor = {}
config.central_server = {}
//defining camera module variables
config.camera.base_url = "http://localhost"
config.camera.port = "3001"
config.camera.apis = {}

//defining central_controller module variables
config.central_controller.base_url = "http://localhost"
config.central_controller.port = "3000"
config.central_controller.apis = {}


config.image_processor.base_url = "http://localhost"
config.image_processor.port = "3002"


config.central_server.base_url = "http://localhost"
config.central_server.port = "5000"
config.central_server.reqCred = {}
config.central_server.reqCred.username = 'traffic-node'
config.central_server.reqCred.password = 'password'
module.exports = config
