'use strict';

var utils = require('../utils/writer.js');
var Products = require('../service/ProductsService');

module.exports.productsGET = function productsGET (req, res, next) {
  Products.productsGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.productsIdDELETE = function productsIdDELETE (req, res, next, id) {
  Products.productsIdDELETE(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.productsIdGET = function productsIdGET (req, res, next, id) {
  Products.productsIdGET(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.productsIdPATCH = function productsIdPATCH (req, res, next, body, id) {
  Products.productsIdPATCH(body, id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
