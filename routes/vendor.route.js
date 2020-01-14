module.exports = (app) => {
    
    const vendor_controller = require('../controllers/vendor.controller');
    const upload = require('../config/vendor_upload.config');

    // CREATE OR UPDATE VENDOR
    app.post('/create_vendor/:id?', upload.fields([{name: 'business_images', maxCount: 10},{name: 'vendor_image', maxCount: 1}, {name: 'cnic_front_image', maxCount: 1}, {name: 'cnic_back_image', maxCount: 1}]) ,vendor_controller.create_vendor);

    // List All Vendors
    app.get('/list_vendors', vendor_controller.list_vendors);

    // List Vendors of a Service
    app.get('/vendors_by_service/:id', vendor_controller.vendors_by_service);

    // Vendor Details
    app.get('/vendor_details/:id', vendor_controller.vendor_details);

    app.delete('/delete_vendor/:id', vendor_controller.delete_vendor);

    app.put('/update_vendor_status/:id', vendor_controller.update_vendor_status);
}