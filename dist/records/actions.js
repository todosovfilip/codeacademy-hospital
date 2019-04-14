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

var _nodemailer = require('nodemailer');

var _nodemailer2 = _interopRequireDefault(_nodemailer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Records = _index2.default.Records;
const Patients = _index2.default.Patients;

const create = async (req, res, next) => {
  const {
    patientId,
    description
  } = req.body;

  if (!((patientId == null || typeof patientId === 'string') && (description == null || typeof description === 'string'))) {
    throw new TypeError('Value of "{\n  patientId,\n  description\n}" violates contract.\n\nExpected:\n{\n  patientId: ?string;\n  description: ?string;\n}\n\nGot:\n' + _inspect({ patientId, description }));
  }

  const recordId = (0, _hat2.default)();
  await Records.create({
    id: recordId,
    patientId,
    description
  });
  const thePatient = await Patients.findOne({ where: { id: patientId } });

  const account = await _nodemailer2.default.createTestAccount();

  const mailerTransporter = _nodemailer2.default.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: true,
    auth: {
      user: 'codeacademyhospital@gmail.com',
      pass: 'q23a6urRQDfSZV3'
    }
  });

  const mailOptions = {
    from: 'Code Academy Hospital',
    to: `${thePatient.email}`,
    subject: `Record id:${recordId}`,
    html: `<h2>Dear ${thePatient.lastName}, ${thePatient.firstName}</h2>
   <h3>Your doctor has written this report:</h3>
   <p>${description}</p>
   <h5>Sincerely, CodeAcademy Hospital</h5>
   `

  };
  if (thePatient.email != null) {
    mailerTransporter.sendMail(mailOptions, (err, response) => {
      if (err) {
        console.error('There was an error', err);
      } else {
        console.log('Mail was sent');
      }
    });
  }

  res.status(201).send(`A record with id ${recordId} for patient with id ${patientId} has been created.`);
  await next;
};

const del = async (req, res, next) => {
  const { id } = req.params;

  if (!(typeof id === 'string')) {
    throw new TypeError('Value of "{\n  id\n}" violates contract.\n\nExpected:\n{\n  id: string\n}\n\nGot:\n' + _inspect({ id }));
  }

  await Records.destroy({ where: { id } });
  res.status(200).send(`The record with id ${id} has been deleted.`);
  await next;
};

const get = async (req, res, next) => {
  const { id } = req.params;

  if (!(typeof id === 'string')) {
    throw new TypeError('Value of "{\n  id\n}" violates contract.\n\nExpected:\n{\n  id: string\n}\n\nGot:\n' + _inspect({ id }));
  }

  const record = await Records.findOne({
    include: [{
      model: _index2.default.Patients,
      as: 'patient'
    }],
    where: { id }
  });
  res.send(record).status(200);
  await next;
};

const list = async (req, res, next) => {
  const result = await Records.findAll({
    include: [{
      model: _index2.default.Patients,
      as: 'patient'
    }]
  });
  res.send(result).status(200);
  await next;
};

const update = async (req, res, next) => {
  const { id } = req.params;

  if (!(typeof id === 'string')) {
    throw new TypeError('Value of "{\n  id\n}" violates contract.\n\nExpected:\n{\n  id: string\n}\n\nGot:\n' + _inspect({ id }));
  }

  const updateData = Object.assign({}, req.body);

  if (!(updateData != null && typeof updateData.description === 'string')) {
    throw new TypeError('Value of variable "updateData" violates contract.\n\nExpected:\n{\n  description: string\n}\n\nGot:\n' + _inspect(updateData));
  }

  await Records.update(updateData, { where: { id } });
  res.send(`Record with id ${id} has been updated.`).status(204);
  await next;
};

exports.default = {
  create,
  del,
  get,
  list,
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