const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let ManagerImageSchema = new Schema({
    imagePath: {type: String, required: true}
});
let ManagerCNICFrontImageSchema = new Schema({
    imagePath: {type: String, required: true}
});

let ManagerCNICBackImageSchema = new Schema({
    imagePath: {type: String, required: true}
});

let ManagerSchema = new Schema({
    name: {type: String, max: 100},
    email: {type: String},
    phone: {type: String},
    password: {type: String},
    cnic: {type: String},
    gender: {type: String},
    mobile1: {type: String},
    mobile2: {type: String},
    address: {type: String},
    image: [ManagerImageSchema],
    cnic_front_image: [ManagerCNICFrontImageSchema],
    cnic_back_image: [ManagerCNICBackImageSchema]
});

module.exports = mongoose.model('Manager', ManagerSchema);