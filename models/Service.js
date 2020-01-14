const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.set('useFindAndModify', false);

let ServiceImageSchema = new Schema({
    imagePath: {type: String, required: true}
});

let ServiceSchema = new Schema({
    name: {type: String, required: true, max: 100},
    availability: {type: String, required: true},
    price: {type: String, required: true},
    type: {type: String, required: true}, // Per Day, Per Event, Per Hour
    image: [ServiceImageSchema],
});

module.exports = mongoose.model('Service', ServiceSchema);