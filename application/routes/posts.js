/**************************************************************
* Author: Mario Leyva Moreno
*
* File: posts.js
*
* Description: The purpose of this router file is to set up a path to a
* page where users are able to post images. Images are uploaded using the sharp
* and multer modules, which are used to specify where the uploaded files should be stored
* and in what format. It also updates our database by updating the object's image path with the
* file path of the uploaded image.
*
**************************************************************/

var express = require('express');
const router = express.Router();
var db = require('../conf/database');
var sharp = require('sharp');
var multer = require('multer');
var crypto = require('crypto');
var PostError = require('../helpers/error/PostError');

// sets up the storage for the file system where images will be stored
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/images");
    },
    // image file names are randomized to improve security
    filename: function (req, file, cb) {
        let fileExt = file.mimetype.split('/')[1];
        let randomName = crypto.randomBytes(22).toString("hex");
        cb(null, `${randomName}.${fileExt}`);
    }
});

var upload = multer({ storage: storage });
const app = express();


router.get('/', (req, res, next) => {
    res.render('post');
});

// router function where restaurant owners can upload a menu of their food items
// incomplete...
router.post('/upload', upload.single('image'), (req, res) => {
    
});

// router function where restaurant owners can post their restaurant information on the site
// incomplete...
router.post('/register_restaurant', upload.single('image'), (req, res) => {
    let file_upload = req.body.file_upload;
    let restaurant_name = req.body.restaurant_name;
    let address_line = req.body.address_line;
    let city = req.body.city;
    let state = req.body.state;
    let country = req.body.country;
    let zip_code = req.body.zip_code;
    let restaurant_address = address_line + '' + city + '' + state + '' + zip_code; // Add spaces between address components
    let restaurant_category = req.body.restaurant_category;
    let delivery_time = req.body.delivery_time;
    let price_range = req.body.delivery_time;
    let filePath = req.file.path;
    sharp(filePath)
        .resize({
            width: 200,
            height: 200,
            fit: 'cover'
        })
        .toFile(`${req.file.destination}/thumbnail-${req.file.filename}`)
        .then(() => {
            const query = `UPDATE Restaurant SET image_path = ? WHERE restaurant_name = ?`;
            db.query(query, [filePath, restaurant_name], (err, result) => {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                } else {
                    res.redirect('/');
                }
            });
        });
});

module.exports = router;


