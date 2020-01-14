const Customer = require('../models/Customer');
const Manager = require('../models/Manager');

found = false;

exports.create_customer = (req, res) => {

    let customer = new Customer({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        cnic: req.body.cnic,
        password: req.body.password,
        gender: req.body.gender
    });

    Customer.find( {$or: [ { email: req.body.email }, { phone: req.body.phone }, { cnic: req.body.cnic} ] })
        .then(result => {
            if(result.length > 0) {
                res.json({
                    status: "failed",
                    message: "Email, Phone, or CNIC already exists in Customers"
                });
                
            } else {
                Manager.find({$or: [ { email: req.body.email }, { phone: req.body.phone }, { cnic: req.body.cnic} ] })
                .then(records => {
                    if(records.length > 0) {
                        res.json({
                            status: "failed",
                            message: "Email, Phone, or CNIC already exists in Managers"
                        });
                    }
                    else {
                        if(req.params.id == null) {
                            customer.save().then(result => {
                                res.json({
                                    status: "success",
                                    message: "Your Account has been Created",
                                    data: result
                                });
                            }).catch(err => res.json({
                                status: "failed",
                                message: "Something went wrong",
                                err: err
                            }));
                        }
                        else {                    
                            Customer.findByIdAndUpdate(req.params.id, {$set: req.body}).then(result => {
                                res.json({
                                    status: "success",
                                    message: "Your Account has been Updated"
                                });
                            }).catch(err => res.json({  
                                status: "failed",
                                message: "Something went wrong"
                            }));
                        }
                    }
                }).catch(err => res.json({
                    status: "failed",
                    message: "Something went wrong",
                    err: err
                }));
            }
        }).catch(err => res.json({
            status: "failed",
            message: "Something went wrong",
            err: err
        }));



    // if(req.params.id == null) {
    //     Customer.find( {$or: [ { email: req.body.email }, { phone: req.body.phone }, { cnic: req.body.cnic} ] })
    //     .then(result => {
    //         if(result.length > 0) {
    //             res.json({
    //                 status: "failed",
    //                 message: "Email, Phone, or CNIC already exists in Customers"
    //             });
                
    //         } else {
    //             Manager.find({$or: [ { email: req.body.email }, { phone: req.body.phone }, { cnic: req.body.cnic} ] })
    //             .then(records => {
    //                 if(records.length > 0) {
    //                     res.json({
    //                         status: "failed",
    //                         message: "Email, Phone, or CNIC already exists in Managers"
    //                     });
    //                 }
    //                 else {
    //                     customer.save().then(result => {
    //                         res.json({
    //                             status: "success",
    //                             message: "Your Account has been Created",
    //                             data: result
    //                         });
    //                     }).catch(err => res.json({
    //                         status: "failed",
    //                         message: "Something went wrong",
    //                         err: err
    //                     }));
    //                 }
    //             }).catch(err => res.json({
    //                 status: "failed",
    //                 message: "Something went wrong",
    //                 err: err
    //             }));
    //         }
    //     }).catch(err => res.json({
    //         status: "failed",
    //         message: "Something went wrong",
    //         err: err
    //     }));
    // }
    // else {
    //     Customer.findByIdAndUpdate(req.params.id, {$set: req.body}).then(result => {
    //         res.json({
    //             status: "success",
    //             message: "Your Account has been Updated"
    //         });
    //     }).catch(err => res.json({
    //         status: "failed",
    //         message: "Something went wrong"
    //     }));
    // }
}

// Find Specific Customer
exports.find_customer = async (req, res) => {
    await Customer.find( {_id: req.params.id} ).then(result => res.json({
        status: "success",
        message: "Customer Found",
        data: result
    })).catch(err => res.json({
        status: "failed",
        message: "Something went wrong"
    }));
}

// Find All Customers
exports.all_customers = async (req, res) => {
    await Customer.find().then(result => res.json({
        status: "success",
        message: result.length + " Customers Found",
        data: result
    })).catch(err => res.json({
        status: "failed",
        message: "Something went wrong"
    }));
}

// UPDATE CUSTOMER STATUS
exports.update_customer_status = async (req, res) => {
    await Customer.findByIdAndUpdate(req.params.id, {$set: {"status":req.body.status}})
    .then(() => res.json({
        status: "success",
        message: "Customer Status Updated"
    })).catch(err => res.json({
        status: "failed",
        message: "Customer Status Update Failed"
    }));
}

// DELETE CUSTOMER
exports.delete_customer = async (req, res) => {
    await Customer.deleteOne( {_id :req.params.id}).then(result => res.json({
        status: "success",
        message: "Customer Deleted Successfully",
        data: result
    })).catch(err => res.json({
        status: "failed",
        message: "Customer Not Deleted",
        data: err
    }));
}
