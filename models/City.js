const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let CitySchema = new Schema({
    name: {type: String, required: true, max: 100},
    province_id: {type: String, required: true}
});

module.exports = mongoose.model('City', CitySchema);

