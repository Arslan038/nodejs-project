const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.set('useFindAndModify', false);

let VendorImageSchema = new Schema({
    imagePath: {type: String}
});

let BusinessImageSchema = new Schema({
    imagePath: {type: String}
});

let CNICFrontImageSchema = new Schema({
    imagePath: {type: String}
});

let CNICBackImageSchema = new Schema({
    imagePath: {type: String}
});

let VendorSchema = new Schema({
    // Business Details
    business_name: {type: String},
    address: {type: String},
    lat: {type: String},
    lon: {type: String},
    mobile : {type: String},
    landline: {type: String},
    facebook_page: {type: String},
    website: {type: String},
    business_images: [BusinessImageSchema],
    // Vendor Details
    vendor_name: {type: String},
    vendor_email: {type: String},
    vendor_mobile: {type: String},
    vendor_image: [VendorImageSchema],
    vendor_password: {type: String},
    cnic_front_image: [CNICFrontImageSchema],
    cnic_back_image: [CNICBackImageSchema],
    vendor_status: {type: String, default: 'pending'},
    // Assign Service
    service_id: {type: String},
});

module.exports = mongoose.model('Vendor', VendorSchema);