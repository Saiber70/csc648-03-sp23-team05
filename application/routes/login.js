// var express = require('express');
// const router = express.Router();
// const db = require('../conf/database');

// /**
//  * after user click the sign up button in the login page,
//  * the user will be rendered to the home page so user can choose
//  * which registration they need.
//  */

// const signUpBtn = document.querySelector('.btn-outline-dark');

// function navigateToHomePage() {
//   window.location.href = 'home.html';
// }

// signUpBtn.addEventListener('click', () => {
//   // Create a new promise
//   const navigatePromise = new Promise((resolve, reject) => {
//     // Call the function that handles navigating to the home page
//     navigateToHomePage();
//     // Resolve the promise to signal that the navigation was successful
//     resolve();
//   });

//   // Use the promise's .then() method to perform any additional actions
//   navigatePromise.then(() => {
//     console.log('Navigation to home page successful');
//     // Perform any additional actions here
//   }).catch((error) => {
//     console.error(`Navigation failed: ${error}`);
//   });
// });