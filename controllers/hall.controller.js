const Hall = require('../models/Hall');
const SubHall = require('../models/SubHall');
const fs = require('fs');

// ADD or Update Hall
exports.create = function (req, res) {
    var images = [];
    
    //Check if images picked or not
    if(req.files !== undefined) {
        req.files.forEach(element => {
            var obj = {};
            obj['imagePath'] = element.filename;
            images.push(obj);
        });
    }

    let hall = new Hall({
        province: req.body.province || '',
        city: req.body.city || '',
        postal_code: req.body.postal_code || '',
        hall_name: req.body.hall_name || '',
        hall_address: req.body.hall_address || '',
        landline: req.body.landline || '',
        mobile: req.body.mobile || '',
        website: req.body.website || '',
        fb_page: req.body.fb_page || '',
        lat: req.body.lat || '',
        lon: req.body.lon || '',
        total_subhalls: req.body.total_subhalls || '',
        total_menus: req.body.total_menus || '',
        total_bridal_rooms: req.body.total_bridal_rooms || '',
        total_kitchens: req.body.total_kitchens || '',
        total_photo_studios: req.body.total_photo_studios || '',
        hall_description: req.body.hall_description || '',
        ac: req.body.ac || '',
        chillar: req.body.chillar || '',
        lightening: req.body.lightening || '',
        generator: req.body.generator || '',
        sound: req.body.sound || '',
        heater: req.body.heater || '',
        bridal_room: req.body.bridal_room || '',
        stage_decoration: req.body.stage_decoration || '',
        parking: req.body.parking || '',
        parking_area: req.body.parking_area || '',
        valet_parking: req.body.valet_parking || '',
        wifi: req.body.wifi || '',
        hall_images: images || '',
        hall_status: req.body.hall_status || 'pending',
        created_by: req.body.created_by,
        manager_id: req.body.manager_id || ''
    });

    if(req.params.id == null) {
        hall.save((err) => {
          
            if(err){
                res.json({
                    status: "failed",
                    message: "Hall Not Added!"
                });
            }
            res.json({
                status: "success",
                message: "Hall Added Successfully!",
                data : hall
            });
        })
    }
    else {
        Hall.findByIdAndUpdate(req.params.id, {$set: req.body}, (err, hall) => {
            if(err) {
                res.json({
                    status: "failed",
                    message: "Hall Not Updated"
                });
            }
           
            else{
                if(req.files !== undefined) {
                    images=[];
                    
                    req.files.forEach(element => {
                        var obj = {};
                        obj['imagePath'] = element.filename;
                        images.push(obj);
                    });
                    hall.hall_images = images;
                    hall.save().then(saved => {
                        res.json({
                            status: "success",
                            message: "Hall Updated"
                        });
                    })
                } else {
                    res.json({
                        status: "success",
                        message: "Hall Updated"
                    });
                }
            }
        });
    }
};

// Hall Details
exports.hall_details = async (req, res) => {
    await Hall.findById(req.params.id).then(result => res.send(result)).catch(err => {
        res.json({
            status: "failed",
            message: "No Hall Found"
        });
    });
}

// UPDATE STATUS
exports.update_status = async (req, res) => {
    await Hall.findByIdAndUpdate(req.params.id, {$set: {"hall_status":req.body.status}})
        .then(() => res.json({
            status: "success",
            message: "Hall Status Updated"
        })).catch(err => res.json({
            status: "failed",
            message: "Hall Status Update Failed"
        }));
}

// DELETE Hall
exports.delete_hall = async (req, res) => {
    await Hall.deleteOne( {_id : req.params.id}).then(result => {
        SubHall.find({ hall_id: req.params.id}, (err, found) => {
            if(err) {
                res.json({
                    status: "failed",
                    message: "Hall failed Deleted",
                    data: err
                });
            }
            else {
                if(found.length > 0) {
                    SubHall.remove( { hall_id: req.params.id }, (err, deleted) => {
                        if(err) {
                            res.json({
                                status: "failed",
                                message: "Hall Deletion Failed",
                                data: err
                            });
                        }
                        else{
                            res.json({
                                status: "success",
                                message: "Hall Deleted Successfully",
                                data: result
                            });
                        }   
                    });
                } 
            }
        })
    }).catch(err => res.json({
        status: "failed",
        message: "Hall Not Deleted",
        data: err
    }));
}

// Fetch All Halls
exports.halls_list = async (req, res) => {
    await Hall.find().then(result => res.send(result)).catch(err => {
        res.json({
            status: "failed",
            message: "Something went wrong"
        });
    });
}

// Delete Hall Image
exports.delete_hall_image = async (req, res) => {
    await Hall.findByIdAndUpdate(req.params.hall_id, { $pull: { 'hall_images': {_id: req.params.image_id}}} ).then(result => res.json({
        status: "success",
        message: "Hall Image Deleted",
        data: result
    })).catch(err => res.json({
        status: "failed",
        message: "Hall Image Not Deleted",
        data: err
    }));
}