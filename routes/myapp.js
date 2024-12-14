var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){res.render('myapp/', {title: "myapp"})});

module.exports = router;