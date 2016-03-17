var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json({ extended: true }));

//MODELS
var Employee = require('./routes/Employee').Employee;

/////////////
//MIDDLEWARE
/////////////

// ERROR HANDLER: 4 args = error
app.use(function (err, req, res, next) {
    console.log(err.stack);
    res.status(500).send("Im BROKEN!!");
});

/////////////
//WIRE UP ROUTES
/////////////
app.get('/', function (req, res) {
    Employee.find({}, function (err, employees) {
        if (err) console.error(err);
        res.json(employees);
    });
});

var employeeRouter = require('./routes/employee_route');
app.use('/:username', employeeRouter);


/////////////
//START SERVER
/////////////
var server = app.listen(3000, function () {
    console.log("server running at localhost:" + server.address().port);
});

