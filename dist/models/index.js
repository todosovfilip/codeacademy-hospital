'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _sequelize3 = require('../db/sequelize');

var _sequelize4 = _interopRequireDefault(_sequelize3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const models = {
    Patients: _sequelize4.default.import('../patients/model'),
    Rooms: _sequelize4.default.import('../rooms/model'),
    Employees: _sequelize4.default.import('../employees/model'),
    Records: _sequelize4.default.import('../records/model'),
    Medicaments: _sequelize4.default.import('../medicaments/model')
};
Object.keys(models).forEach(modelName => {
    if ('associate' in models[modelName]) {
        models[modelName].associate(models);
    }
});

models.Patients.belongsTo(models.Rooms);
models.Rooms.hasMany(models.Patients);

models.Records.belongsTo(models.Patients);
models.Patients.hasMany(models.Records);

models.Patients.belongsTo(models.Employees);
models.Employees.hasMany(models.Patients);

models.Records.hasMany(models.Medicaments);

models.connection = _sequelize4.default;
models.Sequelize = _sequelize2.default;

exports.default = models;

/*
const room = models.Rooms.findOne({
    include:[
        {
            model: models.Patients,
            as:'patients'
        }
    ]
});

*/