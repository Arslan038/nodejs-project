module.exports = (app) => {
    const menu_controller = require('../controllers/menu.controller');
    const upload = require('../config/menu_upload.config.js');

    //CREATE OR UPDATE MENU
    app.post('/menu/:id?', upload.array('menu_images', 3), menu_controller.create );

    //Menu List (All Menus OR Hall Specific Menus)
    app.get('/menu_list/:id?', menu_controller.menu_list);

    //Menu Details
    app.get('/menu_details/:id', menu_controller.menu_details);

    // Update Menu Status
    app.post('/update_menu_status/:id', menu_controller.update_menu_status);

    // Delete Hall Images
    app.get('/delete_menu_image/:menu_id/:image_id', menu_controller.delete_menu_image);

    // Delete Menu
    app.delete('/delete_menu/:id', menu_controller.delete_menu);

}