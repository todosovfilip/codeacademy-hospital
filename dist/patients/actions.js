'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _hat = require('hat');

var _hat2 = _interopRequireDefault(_hat);

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _index = require('../models/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Patients = _index2.default.Patients;
const Op = _sequelize2.default.Op;

const get = async (req, res, next) => {
    const { id } = req.params;
    const result = await Patients.findOne({
        include: [{
            model: _index2.default.Records,
            as: 'Records'
        }]
    }, { where: { id } });

    res.status(200).send(result);
    await next;
};

const list = async (req, res, next) => {
    const result = await Patients.findAll({
        include: [{
            model: _index2.default.Records,
            as: 'Records'
        }]
    });
    res.status(200).send(result);
    await next;
};

const create = async (req, res, next) => {
    const {
        firstName,
        lastName,
        dateOfBirth,
        sex,
        address,
        phone,
        email,
        dateAdmitted,
        dateReleased,
        roomId,
        EmployeeId
    } = req.body;

    if (!(typeof firstName === 'string' && typeof lastName === 'string' && typeof dateOfBirth === 'string' && typeof sex === 'string' && typeof address === 'string' && typeof phone === 'string' && typeof email === 'string' && (dateAdmitted == null || typeof dateAdmitted === 'string') && (dateReleased == null || typeof dateReleased === 'string') && (roomId == null || typeof roomId === 'string') && (EmployeeId == null || typeof EmployeeId === 'string'))) {
        throw new TypeError('Value of "{\n  firstName,\n  lastName,\n  dateOfBirth,\n  sex,\n  address,\n  phone,\n  email,\n  dateAdmitted,\n  dateReleased,\n  roomId,\n  EmployeeId\n}" violates contract.\n\nExpected:\n{\n  firstName: string;\n  lastName: string;\n  dateOfBirth: string;\n  sex: string;\n  address: string;\n  phone: string;\n  email: string;\n  dateAdmitted: ?string;\n  dateReleased: ?string;\n  roomId: ?string;\n  EmployeeId: ?string;\n}\n\nGot:\n' + _inspect({ firstName, lastName, dateOfBirth, sex, address, phone, email, dateAdmitted, dateReleased, roomId, EmployeeId }));
    }

    const patientId = (0, _hat2.default)();

    await Patients.create({
        id: patientId,
        firstName,
        lastName,
        dateOfBirth,
        sex,
        address,
        phone,
        email,
        dateAdmitted,
        dateReleased,
        roomId,
        EmployeeId
    });
    res.status(201).send(`Patient ${lastName.toUpperCase()},${firstName.toUpperCase()} with id ${patientId} has been created.`);
    await next;
};

const update = async (req, res, next) => {
    const { id } = req.params;
    const updateData = Object.assign({}, req.body);

    if (!(updateData != null && (updateData.firstName == null || typeof updateData.firstName === 'string') && (updateData.lastName == null || typeof updateData.lastName === 'string') && (updateData.dateOfBirth == null || typeof updateData.dateOfBirth === 'string') && (updateData.sex == null || typeof updateData.sex === 'string') && (updateData.address == null || typeof updateData.address === 'string') && (updateData.phone == null || typeof updateData.phone === 'string') && (updateData.email == null || typeof updateData.email === 'string') && (updateData.dateAdmitted == null || typeof updateData.dateAdmitted === 'string') && (updateData.dateReleased == null || typeof updateData.dateReleased === 'string') && (updateData.roomId == null || typeof updateData.roomId === 'string') && (updateData.EmployeeId == null || typeof updateData.EmployeeId === 'string'))) {
        throw new TypeError('Value of variable "updateData" violates contract.\n\nExpected:\n{\n  firstName: ?string;\n  lastName: ?string;\n  dateOfBirth: ?string;\n  sex: ?string;\n  address: ?string;\n  phone: ?string;\n  email: ?string;\n  dateAdmitted: ?string;\n  dateReleased: ?string;\n  roomId: ?string;\n  EmployeeId: ?string;\n}\n\nGot:\n' + _inspect(updateData));
    }

    Patients.update(updateData, { where: { id } });
    res.send(`Patient with id ${id} has been updated.`).status(204);

    await next;
};

const today = async (req, res, next) => {
    const tod = new Date();
    await tod.setHours(0, 0, 0, 0);
    tod.toISOString();
    console.log(tod);
    const result = await Patients.findAll({ where: { createdAt: {
                [Op.gte]: tod
            } } });

    if (!Array.isArray(result)) {
        throw new TypeError('Value of variable "result" violates contract.\n\nExpected:\nArray\n\nGot:\n' + _inspect(result));
    }

    res.status(200).send(result);
    await next;
};

const week = async (req, res, next) => {
    let date = new Date();
    date.setDate(date.getDate() - 7);
    await date.setHours(0, 0, 0, 0);

    const result = await Patients.findAll({ where: { createdAt: {
                [Op.gte]: date
            } } });

    if (!Array.isArray(result)) {
        throw new TypeError('Value of variable "result" violates contract.\n\nExpected:\nArray\n\nGot:\n' + _inspect(result));
    }

    res.status(200).send(result);
    await next;
};

exports.default = {
    get,
    list,
    create,
    update,
    today,
    week

    // {
    //     include:[
    //     {
    //         model: models.Records,
    //         as:'Records'
    //     }
    // ]
    // }

};

function _inspect(input, depth) {
    const maxDepth = 4;
    const maxKeys = 15;

    if (depth === undefined) {
        depth = 0;
    }

    depth += 1;

    if (input === null) {
        return 'null';
    } else if (input === undefined) {
        return 'void';
    } else if (typeof input === 'string' || typeof input === 'number' || typeof input === 'boolean') {
        return typeof input;
    } else if (Array.isArray(input)) {
        if (input.length > 0) {
            if (depth > maxDepth) return '[...]';

            const first = _inspect(input[0], depth);

            if (input.every(item => _inspect(item, depth) === first)) {
                return first.trim() + '[]';
            } else {
                return '[' + input.slice(0, maxKeys).map(item => _inspect(item, depth)).join(', ') + (input.length >= maxKeys ? ', ...' : '') + ']';
            }
        } else {
            return 'Array';
        }
    } else {
        const keys = Object.keys(input);

        if (!keys.length) {
            if (input.constructor && input.constructor.name && input.constructor.name !== 'Object') {
                return input.constructor.name;
            } else {
                return 'Object';
            }
        }

        if (depth > maxDepth) return '{...}';
        const indent = '  '.repeat(depth - 1);
        let entries = keys.slice(0, maxKeys).map(key => {
            return (/^([A-Z_$][A-Z0-9_$]*)$/i.test(key) ? key : JSON.stringify(key)) + ': ' + _inspect(input[key], depth) + ';';
        }).join('\n  ' + indent);

        if (keys.length >= maxKeys) {
            entries += '\n  ' + indent + '...';
        }

        if (input.constructor && input.constructor.name && input.constructor.name !== 'Object') {
            return input.constructor.name + ' {\n  ' + indent + entries + '\n' + indent + '}';
        } else {
            return '{\n  ' + indent + entries + '\n' + indent + '}';
        }
    }
}