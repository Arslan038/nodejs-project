const SubHall = require('../models/SubHall');
const fs = require('fs');

// Add or Update SubHall
exports.create = (req, res) => {

    // SubHall Images
    if(req.files.subhall_images !== undefined) {

        const subTotal = req.files.subhall_images.length;
        var subHallImages = [];
        for (var image = 0; image < subTotal; image++) {
            var obj = {};
            obj['imagePath'] = req.files.subhall_images[image].filename;
            subHallImages.push(obj);
        }
        
    } 

    // Bridal Images
    
    if(req.files.bridal_room_images !== undefined) {
    const bridalTotal = req.files.bridal_room_images.length;
    var bridalImages = [];
    for (var image = 0; image < bridalTotal; image++) {
        var obj = {};
        obj['imagePath'] = req.files.bridal_room_images[image].filename;
        bridalImages.push(obj);
    }
} else {
    bridalImages=[]
}

    // Photo Studio Images
    if(req.files.photo_studio_images !== undefined) {
    const studioTotal = req.files.photo_studio_images.length;
    var studioImages = [];
    for (var image = 0; image < studioTotal; image++) {
        var obj = {};
        obj['imagePath'] = req.files.photo_studio_images[image].filename;
        studioImages.push(obj);
    }
} else {
    studioImages=[]
}

    let subhall = new SubHall({
        subhall_name: req.body.subhall_name || '',
        capacity: req.body.capacity || '',
        photo_studio: req.body.photo_studio || '',
        kitchen: req.body.kitchen || '',
        sound: req.body.sound || '',
        heater: req.body.heater || '',
        ac: req.body.ac || '',
        ac_price: req.body.ac_price || '',
        heater_price: req.body.heater_price || '',
        sound_price: req.body.sound_price || '',
        subhall_price: req.body.subhall_price || '',
        subhall_images: subHallImages || '',
        bridal_room_images: bridalImages || '',
        photo_studio_images: studioImages || '',
        hall_id: req.body.hall_id,
        bridal_room : req.body.bridal_room || '',
        subhall_status : 'active'
    });

    if(req.params.id == null) {
        subhall.save( (err) => {
            if(err) {
                res.json({
                    status: "failed",
                    message: "SubHall addition failed",
                    error: err
                });
            }
            else{
                res.json({
                    status: "success",
                    message: "SubHall Added Successfully!",
                    data : subhall
                });
            }
        })
    }
    else{
        SubHall.findByIdAndUpdate(req.params.id, {$set: req.body}, (err, subhall) => {
            if(err) {
                res.json({
                    status: "failed",
                    message: "SubHall Updation Failed"
                });
            }
            else{
                if(req.files.bridal_room_images !== undefined || req.files.photo_studio_images !== undefined ||
                     req.files.subhall_images !== undefined){
                if(req.files.bridal_room_images !== undefined) {
                    bridalImages= [];
                    for (var image = 0; image < req.files.bridal_room_images.length; image++) {
                        var obj = {};
                        obj['imagePath'] = req.files.bridal_room_images[image].filename;
                        bridalImages.push(obj);
                    }
                    subhall.bridal_room_images = bridalImages;
                }
                if(req.files.photo_studio_images !== undefined) {
                    studioImages= [];
                    for (var image = 0; image < req.files.photo_studio_images.length; image++) {
                        var obj = {};
                        obj['imagePath'] = req.files.photo_studio_images[image].filename;
                        studioImages.push(obj);
                    }
                    subhall.photo_studio_images = studioImages;
                }
                if(req.files.subhall_images !== undefined) {
                    subHallImages =  [];
                    for (var image = 0; image < req.files.subhall_images.length; image++) {
                        var obj = {};
                        obj['imagePath'] = req.files.subhall_images[image].filename;
                        subHallImages.push(obj);
                    }
                    subhall.subhall_images = subHallImages;
                }
                subhall.save().then(saved => {
                    res.json({
                        status: "success",
                        message: "SubHall Updated"
                    });
                })
            } else {
                res.json({
                    status: "success",
                    message: "SubHall Updated"
                });
            }
               
            }
        });
    }
}

// Fetch All SubHalls or Hall SubHalls
exports.subhalls = async (req, res) => {
    if(req.params.id == null){
        await SubHall.find().then(result => res.json({
            status: "success",
            message: "SubHalls Found",
            data: result
        })).catch(err => res.json({
            status: "failed",
            message: "Something went Wrong"
        }));
    }
    else{
        await SubHall.findById({ _id: req.params.id }).then(result => res.json({
            status: "success",
            message: "SubHalls Found",
            data: result
        })).catch(err => res.json({
            status: "failed",
            message: "Something went Wrong"
        }));
    }
}

exports.delete_subhall = async (req, res) => {
    await SubHall.deleteOne( {_id :req.params.id}).then(result => res.json({
        status: "success",
        message: "Sub Hall Deleted Successfully",
        data: result
    })).catch(err => res.json({
        status: "failed",
        message: "Sub Hall Not Deleted",
        data: err
    }));
}


// Delete Sub Hall Image
exports.delete_subhall_image = async (req, res) => {
    await SubHall.findByIdAndUpdate(req.params.subhall_id, { $pull: { 'subhall_images': {_id: req.params.subhall_image_id}}} ).then(result => {
        res.json({
        status: "success",
        message: "SubHall Image Deleted",
        data: result
    })}).catch(err => res.json({
        status: "failed",
        message: "SubHall Image Not Deleted",
        data: err
    }));
}

// Delete Brial Room Image
exports.delete_bridal_room_image = async (req, res) => {
    await SubHall.findByIdAndUpdate(req.params.subhall_id, { $pull: { 'bridal_room_images': {_id: req.params.bridal_room_image_id}}} ).then(result => { 
        //fs.unlinkSync(__basedir + '/images/subhall_images/');
        res.json({
        status: "success",
        message: "Bridal Room Image Deleted",
        data: result
    })}).catch(err => res.json({
        status: "failed",
        message: "Bridal Room Image Not Deleted",
        data: err
    }));
}


// Delete Photo Studio Image
exports.delete_photo_studio_image = async (req, res) => {
    await SubHall.findByIdAndUpdate(req.params.subhall_id, { $pull: { 'photo_studio_images': {_id: req.params.photo_studio_image_id}}} ).then(result => { 
        //fs.unlinkSync(__basedir + '/images/subhall_images/');
        res.json({
        status: "success",
        message: "Photo Studio Image Deleted",
        data: result
    })}).catch(err => res.json({
        status: "failed",
        message: "Photo Studio Image Not Deleted",
        data: err
    }));
}

// GET Images
exports.get_images = async (req, res) => {
    await SubHall.find( { _id: req.params.subhall_id }, {subhall_images: {$elemMatch: {_id: req.params.image_id}}})
    .then(result => {
        var path = result[0].subhall_images[0].imagePath;
        console.log(path);
        fs.unlinkSync(__basedir + '/images/subhall_images/'+path);
        //res.json(result[0].subhall_images[0].imagePath)
        SubHall.findByIdAndUpdate(req.params.subhall_id, { $pull: { 'subhall_images': {_id: req.params.subhall_image_id}}} ).then(result => {
            res.json({
            status: "success",
            message: "SubHall Image Deleted",
            data: result
        })}).catch(err => res.json({
            status: "failed",
            message: "SubHall Image Not Deleted",
            data: err
        }));
    }).catch(err => res.json(err));
}
// UPDATE SUBHALL STATUS
exports.update_subhall_status = async (req, res) => {
    await SubHall.findByIdAndUpdate(req.params.id, {$set: {"subhall_status":req.body.status}})
    .then(() => res.json({
        status: "success",
        message: "SubHall Status Updated"
    })).catch(err => res.json({
        status: "failed",
        message: "SubHall Status Update Failed"
    }));
}