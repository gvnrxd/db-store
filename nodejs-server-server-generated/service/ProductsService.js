'use strict';


/**
 * Retreve all products
 * Returns a list of all products available in the store
 *
 * returns List
 **/
exports.productsGET = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "price" : 24.99,
  "name" : "3 Star Dragon Ball",
  "id" : 7
}, {
  "price" : 24.99,
  "name" : "3 Star Dragon Ball",
  "id" : 7
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Delete a product
 * Removes a product from the store
 *
 * id Integer ID of the product
 * no response value expected for this operation
 **/
exports.productsIdDELETE = function(id) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Retrieve a specific product
 * Returns a single product from the store
 *
 * id Integer ID of the product
 * returns inline_response_200_8
 **/
exports.productsIdGET = function(id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "price" : 24.99,
  "name" : "3 star Dragon Ball",
  "description" : "Dragon Ball collectible from the series",
  "id" : 7
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Update a specific product
 * Updates one or more fields of a product in the store
 *
 * body Products_id_body 
 * id Integer ID of the product
 * returns inline_response_200_9
 **/
exports.productsIdPATCH = function(body,id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "description:" : "Dragon Ball",
  "price" : 24.99,
  "name" : "4 Star Dragon Ball",
  "id" : 7
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

