const multer = require('multer');
const tinify = require("tinify");
var path = require('path');
tinify.key = "0h5cz0gu6Xr2aXUTgBdtCoD29tkktK53";

    const storage = multer.diskStorage({
        destination: function(req, file, cb){
            cb(null, __basedir + '/images/hall_images/');
        },
        filename: function(req, file, cb) {
        
            cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
        }
    });
    const upload = multer({storage: storage});

    module.exports = upload;