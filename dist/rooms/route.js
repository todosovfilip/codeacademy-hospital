'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _actions = require('./actions');

var _actions2 = _interopRequireDefault(_actions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const roomRoute = (0, _express.Router)();

roomRoute.get('/rooms', _actions2.default.list);
roomRoute.get('/rooms/:id', _actions2.default.get);
roomRoute.post('/rooms', _actions2.default.create);
roomRoute.delete('/rooms/:id', _actions2.default.del);
roomRoute.put('/rooms/:id', _actions2.default.update);

exports.default = roomRoute;