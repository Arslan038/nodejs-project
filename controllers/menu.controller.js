const Menu = require('../models/Menu');

// ADD or Update Menu
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

    let menu = new Menu({
        rice: req.body.rice,
        main_dishes: req.body.main_dishes,
        bar_b_q: req.body.bar_b_q,
        desserts: req.body.desserts,
        naan: req.body.naan,
        drinks: req.body.drinks,
        juices: req.body.juices,
        soup: req.body.soup,
        menu_images: images,
        menu_price: req.body.menu_price,
        hall_id: req.body.hall_id
        
    });

    
    if(req.params.id == null) {
        menu.save((err) => {
          
            if(err){
                res.json({
                    status: "failed",
                    message: "Menu Not Added!"
                });
            }
            res.json({
                status: "success",
                message: "Menu Added Successfully!",
                data : menu
            });
        })
    }
    else {
        Menu.findByIdAndUpdate(req.params.id, {$set: req.body}, (err, menu) => {
            if(err) {
                res.json({
                    status: "failed",
                    message: "Menu Not Updated"
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
                    menu.menu_images = images;
                    menu.save().then(saved => {
                        res.json({
                            status: "success",
                            message: "Menu Updated"
                        });
                    })
                } else {
                    res.json({
                        status: "success",
                        message: "Menu Updated"
                    });
                }
            }
        });
    }
};

// Fetch All Menus OR Halls Specific Menus
exports.menu_list = async (req, res) => {
    if(req.params.id == null) {
        await Menu.find().then(result => res.send(result)).catch(err => {
            res.json({
                status: "failed",
                message: "Something went wrong",
                err: err
            });
        });
    }
    else {
        await Menu.find({hall_id :req.params.id}).then(result => res.send(result)).catch(err => {
            res.json({
                status: "failed",
                message: "Something went wrong",
                err: err
            });
        });
    }
}

// Menu Details
exports.menu_details = async (req, res) => {
    await Menu.findById(req.params.id).then(result => res.send(result)).catch(err => {
        res.json({
            status: "failed",
            message: "No Menu Found"
        });
    });
}

// UPDATE Menu STATUS
exports.update_menu_status = async (req, res) => {
    await Menu.findByIdAndUpdate(req.params.id, {$set: {"menu_status":req.body.menu_status}})
        .then(() => res.json({
            status: "success",
            message: "Menu Status Updated"
        })).catch(err => res.json({
            status: "failed",
            message: "Menu Status Update Failed"
        }));
}

// Delete Menu Image
exports.delete_menu_image = async (req, res) => {
    await Menu.findByIdAndUpdate(req.params.menu_id, { $pull: { 'menu_images': {_id: req.params.image_id}}} ).then(result => res.json({
        status: "success",
        message: "Menu Image Deleted",
        data: result
    })).catch(err => res.json({
        status: "failed",
        message: "Menu Image Not Deleted",
        data: err
    }));
}

// DELETE MENU
exports.delete_menu = async (req, res) => {
    await Menu.deleteOne( {_id :req.params.id}).then(result => res.json({
        status: "success",
        message: "Menu Deleted Successfully",
        data: result
    })).catch(err => res.json({
        status: "failed",
        message: "Menu Not Deleted",
        data: err
    }));
}