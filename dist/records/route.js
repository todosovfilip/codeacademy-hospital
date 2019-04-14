'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _actions = require('./actions');

var _actions2 = _interopRequireDefault(_actions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const recordRouter = (0, _express.Router)();

recordRouter.post('/records', _actions2.default.create);
recordRouter.delete('/records/:id', _actions2.default.del);
recordRouter.get('/records', _actions2.default.list);
recordRouter.get('/records/:id', _actions2.default.get);
recordRouter.put('/records/:id', _actions2.default.update);

exports.default = recordRouter;