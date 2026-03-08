'use strict';


/**
 * Log in a user
 *
 * body Auth_login_body 
 * no response value expected for this operation
 **/
exports.authLoginPOST = function(body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Logout the current user
 * Logs out the user. The client must delete the stored JWT token.
 *
 * returns inline_response_200
 **/
exports.authLogoutPOST = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "message" : "Logged out successfully"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Refresh access token
 * Issues a new access token using a valid refresh token.
 *
 * body Auth_refresh_body 
 * returns inline_response_200_1
 **/
exports.authRefreshPOST = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "accessToken" : "eyJhbGciOiJIUzI1niIsInR5cCI6IkpXVCJ9..."
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Register a new user
 *
 * body Auth_register_body 
 * returns inline_response_201
 **/
exports.authRegisterPOST = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "message" : "User registered successfully"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

