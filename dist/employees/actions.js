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

const Employees = _index2.default.Employees;
const Op = _sequelize2.default.Op;

const create = async (req, res, next) => {
  const {
    firstName,
    lastName,
    dateOfEmployment,
    sex,
    salary,
    address,
    email,
    phone,
    specialty
  } = req.body;

  if (!(typeof firstName === 'string' && typeof lastName === 'string' && typeof dateOfEmployment === 'string' && typeof sex === 'string' && typeof salary === 'string' && typeof address === 'string' && typeof email === 'string' && typeof phone === 'string' && typeof specialty === 'string')) {
    throw new TypeError('Value of "{\n  firstName,\n  lastName,\n  dateOfEmployment,\n  sex,\n  salary,\n  address,\n  email,\n  phone,\n  specialty\n}" violates contract.\n\nExpected:\n{\n  firstName: string;\n  lastName: string;\n  dateOfEmployment: string;\n  sex: string;\n  salary: string;\n  address: string;\n  email: string;\n  phone: string;\n  specialty: string;\n}\n\nGot:\n' + _inspect({ firstName, lastName, dateOfEmployment, sex, salary, address, email, phone, specialty }));
  }

  const employeeId = (0, _hat2.default)();
  await Employees.create({
    id: employeeId,
    firstName,
    lastName,
    dateOfEmployment,
    sex,
    salary,
    address,
    email,
    phone,
    specialty
  });
  res.status(201).send(`Employee ${lastName.toUpperCase()}, ${firstName.toUpperCase()} with id ${employeeId} has been created.`);
  await next;
};

const list = async (req, res, next) => {
  const result = await Employees.findAll({
    include: [{
      model: _index2.default.Patients,
      as: 'patients'
    }]
  });
  res.status(200).send(result);
  await next;
};

const get = async (req, res, next) => {
  const { id } = req.params;

  if (!(typeof id === 'string')) {
    throw new TypeError('Value of "{\n  id\n}" violates contract.\n\nExpected:\n{\n  id: string\n}\n\nGot:\n' + _inspect({ id }));
  }

  const result = await Employees.findOne({
    include: [{
      model: _index2.default.Patients,
      as: 'patients'
    }]
  }, { where: { id } });
  if (result) res.status(200).send(result);
  res.status(404).send(`No employee was found with the given id.`);
  await next;
};

const del = async (req, res, next) => {
  const { id } = req.params;

  if (!(typeof id === 'string')) {
    throw new TypeError('Value of "{\n  id\n}" violates contract.\n\nExpected:\n{\n  id: string\n}\n\nGot:\n' + _inspect({ id }));
  }

  const result = await Employees.findOne({ where: { id } });
  if (result) {
    Employees.destroy({ where: { id } });
    res.status(200).send(`The employee with id ${id} has been deleted.`);
  }
  res.status(404).send(`No employee was found with the given id.`);
  await next;
};

const update = async (req, res, next) => {
  const { id } = req.params;

  if (!(typeof id === 'string')) {
    throw new TypeError('Value of "{\n  id\n}" violates contract.\n\nExpected:\n{\n  id: string\n}\n\nGot:\n' + _inspect({ id }));
  }

  const updateData = Object.assign({}, req.body);

  if (!(updateData != null && (updateData.firstName == null || typeof updateData.firstName === 'string') && (updateData.lastName == null || typeof updateData.lastName === 'string') && (updateData.dateOfEmployment == null || typeof updateData.dateOfEmployment === 'string') && (updateData.sex == null || typeof updateData.sex === 'string') && (updateData.salary == null || typeof updateData.salary === 'string') && (updateData.address == null || typeof updateData.address === 'string') && (updateData.email == null || typeof updateData.email === 'string') && (updateData.phone == null || typeof updateData.phone === 'string') && (updateData.specialty == null || typeof updateData.specialty === 'string'))) {
    throw new TypeError('Value of variable "updateData" violates contract.\n\nExpected:\n{\n  firstName: ?string;\n  lastName: ?string;\n  dateOfEmployment: ?string;\n  sex: ?string;\n  salary: ?string;\n  address: ?string;\n  email: ?string;\n  phone: ?string;\n  specialty: ?string;\n}\n\nGot:\n' + _inspect(updateData));
  }

  const result = await Employees.findOne({ where: { id } });
  if (result) {
    Employees.update(updateData, { where: { id } });
    res.send(`The employee with id ${id} has been successfully updated.`).status(202);
  }
  res.status(404).send(`No employee was found with the given id.`);
  await next;
};

exports.default = {
  create,
  list,
  get,
  del,
  update
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