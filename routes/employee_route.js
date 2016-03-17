var express = require('express');
var Employee = require('./Employee').Employee;

var router = express.Router({
    mergeParams: true
});

router.get('/', function (req, res) {
    var username = req.params.username;
    Employee.findOne({username: username}, function (err, employee) {
        if (err) console.error(err);
        res.send(employee);
    });
});

router.use(function (err, req, res, next) {
    if (err) console.error(err.stack);
    res.status(500).send('Something broke!');
});

router.put('/', function (req, res, next) {
    var update = req.body;
    Employee.findOneAndUpdate({username: req.params.username}, update, function(err, employee) {
        res.json(employee);
    });
});


module.exports = router;
