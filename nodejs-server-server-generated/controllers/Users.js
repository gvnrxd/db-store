'use strict';

var utils = require('../utils/writer.js');
var Users = require('../service/UsersService');

module.exports.usersGET = function usersGET (req, res, next, limit) {
  Users.usersGET(limit)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.usersIdCartGET = function usersIdCartGET (req, res, next, id) {
  Users.usersIdCartGET(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.usersIdCartPOST = function usersIdCartPOST (req, res, next, body, id) {
  Users.usersIdCartPOST(body, id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.usersIdCartProductIdDELETE = function usersIdCartProductIdDELETE (req, res, next, id, productId) {
  Users.usersIdCartProductIdDELETE(id, productId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.usersIdCartProductIdPATCH = function usersIdCartProductIdPATCH (req, res, next, body, id, productId) {
  Users.usersIdCartProductIdPATCH(body, id, productId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.usersIdDELETE = function usersIdDELETE (req, res, next, id) {
  Users.usersIdDELETE(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.usersIdGET = function usersIdGET (req, res, next, id) {
  Users.usersIdGET(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.usersIdPATCH = function usersIdPATCH (req, res, next, body, id) {
  Users.usersIdPATCH(body, id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
