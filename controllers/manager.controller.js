const Manager = require('../models/Manager');

exports.create = (req, res) => {
    var managerImage = [];
    if(req.files.image !== undefined) {
        const managerTotal = req.files.image.length;
        for(var img = 0; img < managerTotal; img++){
            var obj = {};
            obj['imagePath'] = req.files.image[img].filename;
            managerImage.push(obj);
        }
    }

    
    var frontImage = [];
    if(req.files.cnic_front !== undefined) {
        const frontTotal = req.files.cnic_front.length;
        for(var image = 0; image < frontTotal; image++){
            var obj = {};
            obj['imagePath'] = req.files.cnic_front[image].filename;
            frontImage.push(obj);
        }
    }

    var backImage = [];
    if(req.files.cnic_back !== undefined) {
        const backTotal = req.files.cnic_back.length;
        for(var image = 0; image < backTotal; image++){
            var obj = {};
            obj['imagePath'] = req.files.cnic_back[image].filename;
            backImage.push(obj);
        }

    }

    let manager = new Manager({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
        cnic: req.body.cnic,
        gender: req.body.gender,
        mobile1: req.body.mobile1,
        mobile2: req.body.mobile2,
        address: req.body.address,
        image: managerImage,
        cnic_front_image: frontImage,
        cnic_back_image: backImage
    });

    if(req.params.id == null) {
         manager.save().then(result => res.json({
            status: "success",
            message: "Manager Added",
            data: result
        })).catch(err => res.json({
            status: "failed",
            message: "Something went wrong",
            data: err
        }));
    }
    else {
        Manager.findByIdAndUpdate(req.params.id, {$set: req.body}).then(result => {
            if(managerImage.length > 0 && frontImage.length > 0 && backImage.length > 0){
                result.image = managerImage;
                result.cnic_front_image = frontImage;
                result.cnic_back_image = backImage;
                result.save().then(saved => {
                    res.json({
                        status: "success",
                        message: "Manager Updated",
                        data: result
                    });
                })
            } else {
                res.json({
                    status: "success",
                    message: "Manager Updated",
                    data: result
                });
            }
        }) 
    }
}


// View All Managers or Specific Manager
exports.view_manager = async (req, res) => {
    if(req.params.id == null) {
        await Manager.find().then(result => {
            res.json({
                status: "success",
                message: "Managers Found",
                data: result
            })
        }).catch(err => res.json({
            status: "failed",
            message: "Something went Wrong",
            data: err
        }));
    }

    else{
        await Manager.findById(req.params.id).then(result => {
            res.json({
                status: "success",
                message: "Manager Found",
                data: result
            })
        }).catch(err => res.json({
            status: "failed",
            message: "Something went Wrong",
            data: err
        }));
    }
}


// Delete Manager
exports.delete_manager = async (req, res) => {
    await Manager.deleteOne( {_id :req.params.id}).then(result => res.json({
        status: "success",
        message: "Manager Deleted Successfully",
        data: result
    })).catch(err => res.json({
        status: "failed",
        message: "Manager Not Deleted",
        data: err
    }));
}