'use strict';

var utils = require('../utils/writer.js');
var Auth = require('../service/AuthService');

module.exports.authLoginPOST = function authLoginPOST (req, res, next, body) {
  Auth.authLoginPOST(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.authLogoutPOST = function authLogoutPOST (req, res, next) {
  Auth.authLogoutPOST()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.authRefreshPOST = function authRefreshPOST (req, res, next, body) {
  Auth.authRefreshPOST(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.authRegisterPOST = function authRegisterPOST (req, res, next, body) {
  Auth.authRegisterPOST(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
