const City = require('../models/City');

exports.create_city = async (req, res) => {
    let city = new City({
        name: req.body.name,
        province_id: req.body.province_id
    });

    await city.save().then(result => res.json({
        status: "success",
        message: "city added",
        data: result
    })).catch(err => res.json({
        status: "failed",
        message: "city not added",
        data: err
    }));
}

exports.all_cities = async (req, res) => {
    await City.find().then(result => res.json({
        status: "success",
        message: "success",
        data: result
    })).catch(err => res.json({
        status: "failed",
        message: "something went wrong",
        data: err
    }));
}
exports.province_cities = async (req, res) => {
    await City.find({ province_id: req.params.id }).then(result => res.json({
        status: "success",
        message: "success",
        data: result
    })).catch(err => res.json({
        status: "failed",
        message: "something went wrong",
        data: err
    }));
}