module.exports = (app) => {

    const customer_controller = require('../controllers/customer.controller');

    // CREATE OR UPDATE CUSTOMER
    app.post('/create_customer/:id?', customer_controller.create_customer);

    // Find Specific Customer
    app.get('/find_customer/:id', customer_controller.find_customer);

    // Find All Customers
    app.get('/all_customers', customer_controller.all_customers);

    // Update Customer Status
    app.put('/update_customer_status/:id', customer_controller.update_customer_status);

    // Delete Customer
    app.delete('/delete_customer/:id', customer_controller.delete_customer);
}