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
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/images");
    },
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

router.post('/', upload.single('image'), (req, res) => {
    let filePath = req.file.path;
    let restaurantName = req.body.restaurant_name;
    sharp(filePath)
        .resize({
            width: 200,
            height: 200,
            fit: 'cover'
        })
        .toFile(`${req.file.destination}/thumbnail-${req.file.filename}`)
        .then(() => {
            const query = `UPDATE Restaurant SET image_path = ? WHERE restaurant_name = ?`;
            db.query(query, [filePath, restaurantName], (err, result) => {
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
