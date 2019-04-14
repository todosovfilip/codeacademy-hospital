'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _actions = require('./actions');

var _actions2 = _interopRequireDefault(_actions);

var _route = require('./route');

var _route2 = _interopRequireDefault(_route);

var _model = require('./model');

var _model2 = _interopRequireDefault(_model);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    actions: _actions2.default,
    route: _route2.default,
    model: _model2.default
};