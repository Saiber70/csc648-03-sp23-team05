/**************************************************************
* Author: Mario Leyva Moreno
*
* File: Posts.js
* Description: The purpose of this file is to set up an object to help send data to our
* database for restaurant registration.
*
**************************************************************/


const db = require('../conf/database');
const PostModel = {};

PostModel.create = (restaurant_name, restaurant_address, price_range, restaurant_category, image_path, delivery_time) => {
    let baseSQL = 'INSERT INTO Restaurant (restaurant_name, restaurant_address, price_range, category_name, image_path, delivery_time) VALUE (?,?,?,?,?,?);;';
    return db.execute(baseSQL,[restaurant_name, restaurant_address, price_range, restaurant_category, image_path, delivery_time])
    .then(([results, fields]) => {
        return Promise.resolve(results && results.affectedRows);
    })
    .catch((error) => Promise.reject(error));
};

// Required post model for uploading menu items