module.exports = (app) => {
    const subhall_upload = require('../config/subhall_upload.config.js');
    const subhall_controller = require('../controllers/subhall.controller');

    // Add OR Update SubHall
    app.post('/subhall/:id?', subhall_upload.fields([{name: 'subhall_images', maxCount: 10}, 
    {name: 'bridal_room_images', maxCount: 10}, {name: 'photo_studio_images', maxCount: 10}]), subhall_controller.create);

    // Get All Sub Halls or specific SubHall
    app.get('/subhalls/:id?', subhall_controller.subhalls);

    //Delete Sub Hall
    app.get('/delete_subhall/:id', subhall_controller.delete_subhall);

    // Delete Sub Hall Images
    app.get('/delete_subhall_image/:subhall_id/:subhall_image_id', subhall_controller.delete_subhall_image); 

    // Delete Bridal Room Images
    app.get('/delete_bridal_room_image/:subhall_id/:bridal_room_image_id', subhall_controller.delete_bridal_room_image); 

    // Delete Photo Studio Images
    app.get('/delete_photo_studio_image/:subhall_id/:photo_studio_image_id', subhall_controller.delete_photo_studio_image); 

    app.get('/get_images/:subhall_id/:image_id', subhall_controller.get_images);

    app.post('/update_subhall_status/:id', subhall_controller.update_subhall_status);
}