var uri = 'mongodb://localhost:27017/test';
var _ = require('lodash');

var mongoose = require('mongoose');
mongoose.connect(uri);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    console.log('db connected', callback);
});

var employeeSchema = mongoose.Schema({
    username: String,
    gender: String,
    name: {
        title: String,
        first: String,
        last: String
    },
    location: {
        street: String,
        city: String,
        state: String,
        zip: Number
    }
});

employeeSchema.virtual('name.full').get(function () {
    //return _.startCase(this.name.first + ' ' + this.name.last);
    return this.name.first + ' ' + this.name.last;
});

exports.Employee = mongoose.model('Employee', employeeSchema);