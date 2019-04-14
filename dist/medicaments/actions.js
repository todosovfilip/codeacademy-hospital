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

const Medicaments = _index2.default.Medicaments;

const create = async (req, res, next) => {
  const {
    code,
    price
  } = req.body;

  if (!(typeof code === 'string' && typeof price === 'string')) {
    throw new TypeError('Value of "{\n  code,\n  price\n}" violates contract.\n\nExpected:\n{\n  code: string;\n  price: string;\n}\n\nGot:\n' + _inspect({ code, price }));
  }

  const result = await Medicaments.findAll({ where: { code } });
  if (result.length != 0) {
    res.status(400).send(`Medicament with this code already exists.`);
    await next;
  }

  const medicamentId = (0, _hat2.default)();
  await Medicaments.create({
    id: medicamentId,
    code,
    price
  });
  res.status(201).send(`The medicament with code ${code} and id ${medicamentId} has been created.`);
  await next;
};

const get = async (req, res, next) => {
  const { id } = req.params;

  if (!(typeof id === 'string')) {
    throw new TypeError('Value of "{\n  id\n}" violates contract.\n\nExpected:\n{\n  id: string\n}\n\nGot:\n' + _inspect({ id }));
  }

  const result = await Medicaments.findAll({ where: { id } });
  if (result.length != 0) {
    res.status(200).send(result);
    await next;
  }
  res.status(400).send(`No medicament was found with id ${id}.`);
  await next;
};

const list = async (req, res, next) => {
  const result = await Medicaments.findAll();
  res.status(200).send(result);
  await next;
};

const del = async (req, res, next) => {
  const { id } = req.params;

  if (!(typeof id === 'string')) {
    throw new TypeError('Value of "{\n  id\n}" violates contract.\n\nExpected:\n{\n  id: string\n}\n\nGot:\n' + _inspect({ id }));
  }

  const result = await Medicaments.findAll({ where: { id } });
  if (result.length != 0) {
    await Medicaments.destroy({ where: { id } });
    res.status(200).send(`The medicament with id ${id} has been deleted.`);
    await next;
  }
  res.status(400).send(`No  medicament was found with id ${id}.`);
  await next;
};

const update = async (req, res, next) => {
  const { id } = req.params;

  if (!(typeof id === 'string')) {
    throw new TypeError('Value of "{\n  id\n}" violates contract.\n\nExpected:\n{\n  id: string\n}\n\nGot:\n' + _inspect({ id }));
  }

  const updateData = Object.assign({}, req.body);

  if (!(updateData != null && (updateData.code == null || typeof updateData.code === 'string') && (updateData.price == null || typeof updateData.price === 'string'))) {
    throw new TypeError('Value of variable "updateData" violates contract.\n\nExpected:\n{\n  code: ?string;\n  price: ?string;\n}\n\nGot:\n' + _inspect(updateData));
  }

  const result = await Medicaments.findAll({ where: { id } });
  if (result.length != 0) {
    await Medicaments.update(updateData, { where: { id } });
    res.send(`The medicament with id ${id} has been successfully updated.`).status(202);
    await next;
  }
  res.status(400).send(`No  medicament was found with id ${id}.`);
  await next;
};

const findByCode = async (req, res, next) => {
  const { code } = req.params;

  if (!(typeof code === 'string')) {
    throw new TypeError('Value of "{\n  code\n}" violates contract.\n\nExpected:\n{\n  code: string\n}\n\nGot:\n' + _inspect({ code }));
  }

  const result = await Medicaments.find({ where: { code } });

  if (result != null) {
    res.status(200).send(result);
    await next;
  }
  res.status(400).send(`No medicament was found with code ${code}.`);
  await next;
};

exports.default = {
  create,
  get,
  list,
  del,
  update,
  findByCode
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