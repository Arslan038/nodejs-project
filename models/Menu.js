const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.set('useFindAndModify', false);

let MenuImageSchema = new Schema({
    imagePath: {type: String, required: true}
});

let MenuSchema = new Schema({
    rice: {type: String, required: true},
    main_dishes: {type: String, required: true},
    bar_b_q: {type: String, required: true},
    desserts: {type: String, required: true},
    naan: {type: String, required: true},
    drinks: {type: String, required: true},
    juices: {type: String, required: false},
    soup: {type: String, required: false},
    menu_images: [MenuImageSchema],
    menu_price: {type: String, required: true},
    menu_status: {type: String, required: false, default: "active"},
    hall_id: {type: String, required: true}
});

module.exports = mongoose.model('Menu', MenuSchema);