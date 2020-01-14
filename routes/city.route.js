module.exports = (app) => {

    const city_controller = require('../controllers/city.controller');

    app.post('/create_city', city_controller.create_city);

    app.get('/all_cities', city_controller.all_cities);
    
    app.get('/province_cities/:id', city_controller.province_cities);

}