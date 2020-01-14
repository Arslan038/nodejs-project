module.exports = (app) => {
    
    const province_controller = require('../controllers/province.controller');

    app.post('/create_province', province_controller.create_province);

    app.get('/all_provinces', province_controller.all_provinces);
}