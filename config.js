//configuration file to hold all variables for Central Controller

var config = {};

config.camera = {};
config.central_controller = {}

//defining camera module variables
config.camera.base_url = "http://localhost"
config.camera.port = "3001"
config.camera.apis = {}

//defining central_controller module variables
config.central_controller.base_url = "http://localhost"
config.central_controller.port = "3000"
config.central_controller.apis = {}

module.exports = config
