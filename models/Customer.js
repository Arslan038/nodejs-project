const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.set('useFindAndModify', false);

let CustomerSchema = new Schema({
    name: {type: String, required: true, max: 100},
    email: {type: String, required: true},
    phone: {type: String, required: true},
    cnic: {type: String, required: true},
    password: {type: String, required: true},
    gender: {type: String, required: true},
    status: {type: String, required: true, default: "active"},

});

module.exports = mongoose.model('Customer', CustomerSchema);