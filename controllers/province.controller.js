const Province = require('../models/Province');

exports.create_province = async (req, res) => {
    let province = new Province({
        name: req.body.name
    });

    await province.save().then(result => res.json({
        status: "success",
        message: "province added",
        data: result
    })).catch(err => res.json({
        status: "failed",
        message: "province not added",
        data: err
    }));
}

exports.all_provinces = async (req, res) => {
    await Province.find().then(result => res.json({
        status: "success",
        message: "success",
        data: result
    })).catch(err => res.json({
        status: "failed",
        message: "something went wrong",
        data: err
    }));
}