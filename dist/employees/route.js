'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _actions = require('./actions');

var _actions2 = _interopRequireDefault(_actions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const employeeRouter = (0, _express.Router)();

employeeRouter.post('/employees', _actions2.default.create);
employeeRouter.get('/employees', _actions2.default.list);
employeeRouter.get('/employees/:id', _actions2.default.get);
employeeRouter.delete('/employees/:id', _actions2.default.del);
employeeRouter.put('/employees/:id', _actions2.default.update);

exports.default = employeeRouter;