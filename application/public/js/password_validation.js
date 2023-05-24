/**************************************************************
* Author: Mario Leyva Moreno
*
* File: password_validation.js
* Description: The purpose of this file is to set up server-side validation for password
* confirmation. Current code is not working properly.
*
**************************************************************/

const form = document.getElementById('form');
// Get the password and re-enter password fields
const rePasswordField = document.getElementById('re-password');
const passwordField = document.getElementById('password');
const invalidFeedback = rePasswordField.nextElementSibling;
form.addEventListener('submit', validatePassword);

function validatePassword(event) {
    event.preventDefault();
    // Add an event listener to the re-enter password field
    if (rePasswordField.value !== passwordField.value) {
        event.preventDefault();
        invalidFeedback.textContent = 'Password does not match.';
    } else {
        invalidFeedback.textContent = 'Passwords Match!';
    }
}