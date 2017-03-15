var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
      title: 'Traffic Violation Detection',
      subtitle: 'Central Controller Module'
    });
});

module.exports = router;
