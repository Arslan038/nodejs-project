const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var path = require('path');
global.__basedir = __dirname;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

require('./routes/hall.route')(app);
require('./routes/subhall.route')(app);
require('./routes/manager.route')(app);
require('./routes/province.route')(app);
require('./routes/city.route')(app);
require('./routes/service.route')(app);
require('./routes/vendor.route')(app);
require('./routes/customer.route')(app);
require('./routes/menu.route')(app);

app.use('/hall_images', express.static(__dirname + '/images/hall_images'));
app.use('/subhall_images', express.static(__dirname + '/images/subhall_images'));
app.use('/manager_images', express.static(__dirname + '/images/manager_images'));
app.use('/service_images', express.static(__dirname + '/images/service_images'));
app.use('/vendor_images', express.static(__dirname + '/images/vendor_images'));
app.use('/menu_images', express.static(__dirname + '/images/menu_images'));


// Set up mongoose connection
const mongoose = require('mongoose');
let dev_db_url = 'mongodb+srv://wivaa:wivaa123@cluster0-2h1gi.mongodb.net/test?retryWrites=true';
//let dev_db_url =  'mongodb://localhost:27017/wivaa';
const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, { useNewUrlParser: true }).then(() => console.log('MongoDB connected…'))
.catch(err => console.log(err));

let port = 1234;

app.listen(port, () => {
    console.log('Server is up and running on port number ' + port);
});