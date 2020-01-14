module.exports = (app) => {
    
    const manager_controller = require('../controllers/manager.controller');
    const upload = require('../config/manager_upload.config.js');

    // ADD or Update Manager
    app.post('/manager/:id?', upload.fields([{name: 'image', maxCount: 1}, {name: 'cnic_front', maxCount: 1},{name: 'cnic_back', maxCount: 1}]), manager_controller.create);

    // View All or specific Manager
    app.get('/view_manager/:id?', manager_controller.view_manager);

    app.get('/delete_manager/:id', manager_controller.delete_manager);
}