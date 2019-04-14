'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _actions = require('./actions');

var _actions2 = _interopRequireDefault(_actions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const patientRoute = (0, _express.Router)();

patientRoute.get('/patients', _actions2.default.list);
patientRoute.get('/patients/:id', _actions2.default.get);
patientRoute.get('/patients/other/today', _actions2.default.today);
patientRoute.get('/patients/other/week', _actions2.default.week);
patientRoute.post('/patients', _actions2.default.create);
patientRoute.put('/patients/:id', _actions2.default.update);

exports.default = patientRoute;