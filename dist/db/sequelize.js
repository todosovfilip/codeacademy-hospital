'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _mysql = require('../../config/mysql.json');

var _mysql2 = _interopRequireDefault(_mysql);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const currentDb = _mysql2.default[process.env.NODE_ENV || 'dev'];
const sequelize = new _sequelize2.default(currentDb);

sequelize.sync({ force: false });

exports.default = sequelize;