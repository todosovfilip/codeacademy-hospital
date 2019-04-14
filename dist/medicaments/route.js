'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _actions = require('./actions');

var _actions2 = _interopRequireDefault(_actions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const medicamentRouter = (0, _express.Router)();

medicamentRouter.post('/medicaments', _actions2.default.create);
medicamentRouter.get('/medicaments/:id', _actions2.default.get);
medicamentRouter.get('/medicaments', _actions2.default.list);
medicamentRouter.delete('/medicaments/:id', _actions2.default.del);
medicamentRouter.put('/medicaments/:id', _actions2.default.update);
medicamentRouter.get('/medicaments/code/:code', _actions2.default.findByCode);
exports.default = medicamentRouter;