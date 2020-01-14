const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useFindAndModify', false);

let ProvinceSchema = new Schema({
    name: {type: String, required: true, max: 100},
});

module.exports = mongoose.model('Province', ProvinceSchema);