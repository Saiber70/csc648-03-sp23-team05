/**************************************************************
* Author: Mario Leyva Moreno
*
* File: address_validation.js
* Description: The purpose of this file is to validate input addresses by performing geocoding using google
* maps api and converting addresses to their lat and lng values if the address exists.
*
**************************************************************/


//const axios = require('axios');
import axios from 'axios';

// get registration form
let registrationForm = document.getElementById('restaurant-form');

// listen for submit
registrationForm.addEventListener('submit', geocode);

// Incomplete...
function geocode(e) {
    // Prevent default submission
    e.preventDefault();
    
    // get all the address values
    let address = document.getElementById('restaurant_address').value;
    let city = document.getElementById('city').value;
    let state = document.getElementById('state').value;
    let country = document.getElementById('country').value;

    //get the complete address for geocoding
    let location = address + city + state + country;
    // 
    axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
        params: {
            address: location,
            key: 'AIzaSyCmqtDK6VhShU_U-oV8SrGI53wSluNA-wI'
        }
    })
    .then(function(response){
        if (response.data.results > 0) {
        let lat = response.data.results[0].geometry.location.lat;
        let lng = response.data.results[0].geometry.location.lng;
        } else {
            alert("Restaurant address does not exist.");
        }
    })
    .catch(function(err) {
        console.log('Error:', err.message);
    })
}
