const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.set('useFindAndModify', false);

let HallImageSchema = new Schema({
    imagePath: {type: String, required: true}
});

let HallSchema = new Schema({
    province: {type: String, required: true},
    city: {type: String, required: true},
    postal_code: {type: String, required: true},
    hall_name: {type: String, required: true},
    hall_address: {type: String, required: true},
    landline: {type: String, required: true},
    mobile: {type: String, required: true},
    website: {type: String, required: true},
    fb_page: {type: String, required: true},
    lat: {type: String, required: false},
    lon: {type: String, required: false},
    total_subhalls: {type: String, required: false},
    total_menus: {type: String, required: false},
    total_bridal_rooms: {type: String, required: false},
    total_kitchens: {type: String, required: false},
    total_photo_studios: {type: String, required: false},
    hall_description: {type: String, required: true},
    ac: {type: String, required: false},
    chillar: {type: String, required: false},
    lightening: {type: String, required: false},
    generator: {type: String, required: false},
    sound: {type: String, required: false},
    heater: {type: String, required: false},
    bridal_room: {type: String, required: false},
    stage_decoration: {type: String, required: false},
    parking: {type: String, required: false},
    parking_area: {type: String, required: false},
    valet_parking: {type: String, required: false},
    wifi: {type: String, required: false},
    hall_images: [HallImageSchema],
    hall_status: {type: String, required: false, default: "inactive"},
    created_by: {type: String, required: false, default: "admin"},
    manager_id: {type: String}
});

module.exports = mongoose.model('Hall', HallSchema);
