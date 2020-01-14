const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.set('useFindAndModify', false);

let SubHallImageSchema = new Schema({
    imagePath: {type: String}
});

let BridalRoomImageSchema = new Schema({
    imagePath: {type: String}
});

let PhotoStudioImageSchema = new Schema({
    imagePath: {type: String}
});

let SubHallSchema = new Schema({
    subhall_name: {type: String},
    capacity: {type: String},
    photo_studio: {type: String},
    kitchen: {type: String},
    bridal_room : {type: String},
    sound: {type: String},
    heater: {type: String},
    ac: {type: String},
    ac_price: {type: String},
    heater_price: {type: String},
    sound_price: {type: String},
    subhall_price: {type: String},
    subhall_images: [SubHallImageSchema],
    bridal_room_images: [BridalRoomImageSchema],
    photo_studio_images: [PhotoStudioImageSchema],
    hall_id: {type: String},
    subhall_status: {type: String, default: "active"},
});

module.exports = mongoose.model('SubHall', SubHallSchema);