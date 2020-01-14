module.exports = (app) => {
    const service_controller = require('../controllers/service.controller');
    const upload = require('../config/service_upload.config.js');

    // CREATE OR UPDATE SERVICE
    app.post('/create_service/:id?', upload.single('service_image'), service_controller.create_service);

    // GET ALL SERVICES
    app.get('/all_services', service_controller.all_services);

    // GET SPECIFIC SERVICE
    app.get('/service/:id', service_controller.service);

    // DELETE SERVICE
    app.delete('/delete_service/:id', service_controller.delete_service);
}