const Service = require('../models/Service');

exports.create_service = (req, res) => {
    var serviceImage = [];

    //Check if image picked or not
    if(req.file !== undefined) {
        var obj = {};
        obj['imagePath'] = req.file.filename;
        serviceImage.push(obj);
    }

    let service = new Service({
        name: req.body.name,
        availability: req.body.availability,
        price: req.body.price,
        type: req.body.type,
        image: serviceImage
    });

    // CREATE NEW SERVICE
    if(req.params.id == null) {
        service.save().then(result => res.json({
            status: "success",
            message: "Service Created Successfully",
            data: result
        })).catch(err => res.json({
            status: "failed",
            message: "Service Not Created",
            data: err
        }));
    }
    else{
        // UPDATE SERVICE
        Service.findByIdAndUpdate(req.params.id, {$set: req.body}, (err, service) => {
            if(err) {
                res.json({
                    status: "failed",
                    message: "Service Not Updated",
                    data: err
                });
            }
            else{
                if(req.file !== undefined) {
                    serviceImage = [];

                    var obj = {};
                    obj['imagePath'] = req.file.filename;
                    serviceImage.push(obj);

                    service.image = serviceImage;

                    service.save().then(updated => {
                        res.json({
                            status: "success",
                            message: "Service Updated"
                        }).catch(err => {
                            res.json(err => res.json({
                                status: "failed",
                                message: "Service Update Failed"
                            }));
                        });
                    });
                }
                else {
                    res.json({
                        status: "success",
                        message: "Service Updated"
                    });
                }
            }
        })
    }
}

// All Services
exports.all_services = async (req, res) => {
    await Service.find().then(result => res.json({
        status: "success",
        message: result.length + " Services found",
        data: result
    })).catch(err => res.json({
        status: "failed",
        message: "Something went wrong",
        data: err
    }));
}

// GET SPECIFIC SERVICE
exports.service = async (req, res) => {
    await Service.find({_id : req.params.id}).then(result => res.json({
        status: "success",
        message: "Service found",
        data: result
    })).catch(err => res.json({
        status: "failed",
        message: "Something went wrong",
        data: err
    }));
}

// DELETE SERVICE
exports.delete_service = async (req, res) => {
    await Service.deleteOne({_id :req.params.id}).then(result => res.json({
        status: "success",
        message: "Service Deleted Successfully",
        data: result
    })).catch(err => res.json({
        status: "failed",
        message: "Service Not Deleted",
        data: err
    }));
}