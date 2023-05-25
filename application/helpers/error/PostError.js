/**************************************************************
* Author: Mario Leyva Moreno
*
* File: PostError.js
*
* Description: Helper function that sets up an object to send error messages.
* It sends the error message, the url of the page that the user is redirected to,
* and what kind of error was thrown. Used in posts.js for uploading images.
*
**************************************************************/



class PostError extends Error {
    constructor(message, redirectURL, status) {
        super(message);
        this.redirectURL = redirectURL;
        this.status = status;
    }

    getMessage() {
        return this.message;
    }

    getRedirectURL() {
        return this.redirectURL;
    }

    getStatus() {
        return this.status;
    }
}

module.exports = PostError;