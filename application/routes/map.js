/**************************************************************
* Author: Hajime Miyazaki
*
* File: database.js
*
* Description: The purpose of this file is to set up geocoding functions.
*
**************************************************************/
// var express = require('express');
// // we could also create script in the result.hbs
// //this file is for the reverse geocoding

// // fill the function below for reverse geocoding to retrieve the 
// // corresponding location coordinates with marker on the map by translating
// // from the longitude and latitude from database.

// // route.post() 


// // search function
// const baseURL = 'https://geocode.maps.co/search';
// // change below to assign restaurant address that is related to the restaurant
// // from the user input
// // user input -> restaurant from the front end
// // check if the restaurant name is exist in the database
// // if yes ->  get the restaurant address -> assign this to below variable address
// const address = req.body.address // Retrieve from the database and URL-encode if necessary
// const searchURL = `${baseURL}?q=${encodeURIComponent(address)}`;


// /**
//  * functionality to get restaurant address from the user input 
//  * convert the address into a lng and lat to get the coordinates
//  * into the map
// */
// function getCoordinates(address) {
//     return axios.get('https://geocoding.api.com/endpoint', {
//       params: {
//         address: address
//       }
//     })
//     .then(response => {
//       // Extract the latitude and longitude from the response
//       const { lat, lng } = response.data.results[0].geometry.location;
//       return { latitude: lat, longitude: lng };
//     })
//     .catch(error => {
//       console.error('Error:', error.message);
//       throw error;
//     });
//   }

// /**
//  * functionality to get lng and lat from the database
//  * convert the address into a lng and lat to get the coordinates
//  * into the map
// */
// const baseURL = 'https://geocode.maps.co/reverse';
// const latitude = req.body.latitude; // Retrieve from the database// get latitude from the database based on user input address
// const longitude = req.body.longitude; // Retrieve from the database // get latitude from the database based on user input address
// const reverseURL = `${baseURL}?lat=${latitude}&lon=${longitude}`; // this creates coordinates
  
//   function storeAddressWithCoordinates(address) {
//     return getCoordinates(address)
//       .then(coordinates => {
//         // Insert the address, longitude, and latitude into the database
//         const query = 'INSERT INTO addresses (address, latitude, longitude) VALUES (?, ?, ?)';
//         const values = [address, coordinates.latitude, coordinates.longitude];
  
//         return db.query(query, values);
//       })
//       .then(() => {
//         console.log('Address stored successfully.');
//       })
//       .catch(error => {
//         console.error('Error:', error.message);
//         throw error;
//       })
//       .finally(() => {
//         // Close the database connection
//         db.end();
//       });
//   }




