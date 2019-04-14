'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _index = require('../patients/index');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('../rooms/index');

var _index4 = _interopRequireDefault(_index3);

var _index5 = require('../records/index');

var _index6 = _interopRequireDefault(_index5);

var _index7 = require('../medicaments/index');

var _index8 = _interopRequireDefault(_index7);

var _index9 = require('../employees/index');

var _index10 = _interopRequireDefault(_index9);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const indexRouter = (0, _express.Router)();

indexRouter.use(_index2.default.route);
indexRouter.use(_index4.default.route);
indexRouter.use(_index6.default.route);
indexRouter.use(_index8.default.route);
indexRouter.use(_index10.default.route);

exports.default = indexRouter;