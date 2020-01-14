module.exports = (app) => {
    
const hall_controller = require('../controllers/hall.controller');
const upload = require('../config/hall_upload.config.js');

// Add or Update Hall
app.post('/hall/:id?', upload.array('hall_images', 15), hall_controller.create);

// Hall List (All Halls)
app.get('/hall_list', hall_controller.halls_list);

// Hall Details of a specific Hall
app.get('/hall_details/:id', hall_controller.hall_details);

// Update Hall Status
app.post('/update_status/:id', hall_controller.update_status);

// Delete Hall
app.get('/delete_hall/:id', hall_controller.delete_hall);

// Delete Hall Images
app.get('/delete_hall_image/:hall_id/:image_id', hall_controller.delete_hall_image);

}