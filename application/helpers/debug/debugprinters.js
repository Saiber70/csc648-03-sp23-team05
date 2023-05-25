/**************************************************************
* Author: Mario Leyva Moreno
*
* File: debugprinters.js
*
* Description: Helper function that sets up objects to show descriptive messages in the console.
* Messages will appear in different colors to highlight a success message, an error message, or a request.
*
**************************************************************/

const colors = require('colors');

colors.setTheme({
    error: ['black', 'bgRed'],
    success: ['black', 'bgGreen'],
    request: ['black', 'bgWhite']
})

const printers = {
    errorPrint: (message) => {
        console.log(colors.error(message));
    },

    successPrint: (message) => {
        console.log(colors.success(message));
    },

    requestPrint: (message) => {
        console.log(colors.request(message));
    }
}

module.exports = printers;