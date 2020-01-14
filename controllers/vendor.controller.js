const Vendor = require('../models/Vendor');
const fs = require('fs');

exports.create_vendor = function(req, res) {
    var businessImages = [];
    var vendorImage = [];
    var cnicFrontImage = [];
    var cnicBackImage = [];

    //Check if Business images picked or not
    if(req.files.business_images !== undefined) {
        req.files.business_images.forEach(element => {
            var obj = {};
            obj['imagePath'] = element.filename;
            businessImages.push(obj);
        });
        //console.log(businessImages.length);
    }

    //Check if Vendor image picked or not
    if(req.files.vendor_image !== undefined) {
        req.files.vendor_image.forEach(element => {
            var obj = {};
            obj['imagePath'] = element.filename;
            vendorImage.push(obj);
        });
        console.log(vendorImage.length);
    }

    //Check if Vendor CNIC Front image picked or not
    if(req.files.cnic_front_image !== undefined) {
        req.files.cnic_front_image.forEach(element => {
            var obj = {};
            obj['imagePath'] = element.filename;
            cnicFrontImage.push(obj);
        });
        console.log(cnicFrontImage.length);
    }

    //Check if Vendor CNIC Back image picked or not
    if(req.files.cnic_back_image !== undefined) {
        req.files.cnic_back_image.forEach(element => {
            var obj = {};
            obj['imagePath'] = element.filename;
            cnicBackImage.push(obj);
        });
        console.log(cnicBackImage.length);
    }

    let vendor = new Vendor({
        business_name: req.body.business_name || '',
        address: req.body.address || '',
        lat: req.body.lat || '',
        lon: req.body.lon || '',
        mobile: req.body.mobile || '',
        landline: req.body.landline || '',
        facebook_page: req.body.facebook_page || '',
        website: req.body.website || '',
        business_images: businessImages || '',
        vendor_name: req.body.vendor_name || '',
        vendor_email: req.body.vendor_email || '',
        vendor_mobile: req.body.vendor_mobile || '',
        vendor_image: vendorImage || '',
        vendor_password: req.body.vendor_password || '',
        cnic_front_image: cnicFrontImage || '',
        cnic_back_image: cnicBackImage || '',
        service_id: req.body.service_id
    });

    if(req.params.id == null) {
        // CREATE VENDOR
        vendor.save((err) => {
            if(err) {
                res.json({
                    status: "failed",
                    message: "Vendor addition failed",
                    error: err
                });
            }
            else{
                res.json({
                    status: "success",
                    message: "Vendor Added Successfully!"
                });
            }
        });
    }
    else {
        Vendor.findByIdAndUpdate(req.params.id, {$set: req.body}, (err, vendor) => {
            if(err) {
                res.json({
                    status: "failed",
                    message: "Vendor Updation Failed"
                });
            }
            else{
                if(req.files.business_images !== undefined || req.files.vendor_image !== undefined ||
                    req.files.cnic_front_image !== undefined || req.files.cnic_back_image !== undefined){
                    if(req.files.business_images !== undefined) {
                        businessImages = [];
                        for (var image = 0; image < req.files.business_images.length; image++) {
                            var obj = {};
                            obj['imagePath'] = req.files.business_images[image].filename;
                            businessImages.push(obj);
                        }
                        //console.log('Busniess Images are ' + businessImages[0].imagePath + " " + businessImages[1].imagePath);
                        vendor.business_images = businessImages;
                    }
                    if(req.files.vendor_image !== undefined) {
                        vendorImage = [];
                        for (var image = 0; image < req.files.vendor_image.length; image++) {
                            var obj = {};
                            obj['imagePath'] = req.files.vendor_image[image].filename;
                            vendorImage.push(obj);
                        }
                        vendor.vendor_image = vendorImage;
                    }
                    if(req.files.cnic_front_image !== undefined) {
                            cnicFrontImage = [];
                            for (var image = 0; image < req.files.cnic_front_image.length; image++) {
                                var obj = {};
                                obj['imagePath'] = req.files.cnic_front_image[image].filename;
                                cnicFrontImage.push(obj);
                            }
                            vendor.cnic_front_image = cnicFrontImage;
                        }
                    
                        if(req.files.cnic_back_image !== undefined) {
                            cnicBackImage = [];
                            for (var image = 0; image < req.files.cnic_back_image.length; image++) {
                                var obj = {};
                                obj['imagePath'] = req.files.cnic_back_image[image].filename;
                                cnicBackImage.push(obj);
                            }
                            vendor.cnic_back_image = cnicBackImage;
                        }

                    vendor.save().then(saved => {
                        res.json({
                            status: "success",
                            message: "Vendor Updated"
                        });
                    });
           } else {
               res.json({
                   status: "success",
                   message: "Vendor Updated"
               });
           }
            }
        });
    }
}

// LIST VENDORS
exports.list_vendors = async (req, res) => {
    await Vendor.find().then(result => res.json({
        status: "success",
        message: result.length + " Vendors Found",
        data: result
    })).catch(err => res.json({
        status: "failed",
        message: "Something Went Wrong.",
        data: err
    }));
}

// All Vendors of a Service
exports.vendors_by_service = async (req, res) => {
    await Vendor.find({service_id: req.params.id}).then(result => res.json({
        status: "success",
        message: result.length + " Vendors Found",
        data: result
    })).catch(err => res.json({
        status: "failed",
        message: "Something Went Wrong.",
        data: err
    }));
}

// Vendor Details
exports.vendor_details = async (req, res) => {
    await Vendor.find({_id: req.params.id}).then(result => res.json({
        status: "success",
        message: result.length + " Vendors Found",
        data: result
    })).catch(err => res.json({
        status: "failed",
        message: "Something Went Wrong.",
        data: err
    }));
}

// DELETE VENDOR
exports.delete_vendor = async (req, res) => {
    await Vendor.deleteOne({_id: req.params.id}).then(() => {
        res.json({
            status: "success",
            message: "Vendor Deleted Successfully",
        });
    }).catch(err => {
        res.json({
            status: "failed",
            message: "Vendor Deletion Failed!",
            data: err
        });
    });
}

// UPDATE VENDOR STATUS
exports.update_vendor_status = async(req, res) => {
    await Vendor.findByIdAndUpdate(req.params.id, {$set: {"vendor_status":req.body.status}})
    .then(() => res.json({
        status: "success",
        message: "Vendor Status Updated"
    })).catch(err => res.json({
        status: "failed",
        message: "Vendor Status Update Failed"
    }));
}