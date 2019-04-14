'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _hat = require('hat');

var _hat2 = _interopRequireDefault(_hat);

var _index = require('../models/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Rooms = _index2.default.Rooms;

const list = async (req, res, next) => {
  const result = await Rooms.findAll({
    include: [{
      model: _index2.default.Patients,
      as: 'patients'
    }]
  });
  if (result) res.status(200).send(result);
  res.status(404).send(`No books were found.`);
  await next;
};

const get = async (req, res, next) => {
  const { id } = req.params;

  if (!(typeof id === 'string')) {
    throw new TypeError('Value of "{\n  id\n}" violates contract.\n\nExpected:\n{\n  id: string\n}\n\nGot:\n' + _inspect({ id }));
  }

  const room = await Rooms.findOne({
    include: [{
      model: _index2.default.Patients,
      as: 'patients'
    }],
    where: { id }
  });

  if (room == null) {
    res.status(400).send(`The room with id ${id} doesn't exist.`);
    await next;
  }
  res.status(200).send(room);
  await next;
};

const create = async (req, res, next) => {
  const { capacity } = req.body;

  if (!(typeof capacity === 'string')) {
    throw new TypeError('Value of "{\n  capacity\n}" violates contract.\n\nExpected:\n{\n  capacity: string\n}\n\nGot:\n' + _inspect({ capacity }));
  }

  const roomId = (0, _hat2.default)();

  await Rooms.create({
    id: roomId,
    capacity
  });
  res.status(201).send(`Room with id ${roomId} has been created.`);
  await next;
};

const del = async (req, res, next) => {
  const { id } = req.params;

  if (!(typeof id === 'string')) {
    throw new TypeError('Value of "{\n  id\n}" violates contract.\n\nExpected:\n{\n  id: string\n}\n\nGot:\n' + _inspect({ id }));
  }

  const room = await _index2.default.Rooms.findOne({ where: { id } });
  if (room == null) {
    res.status(400).send(`The room with id ${id} doesn't exist.`);
    await next;
  }
  await Rooms.destroy({ where: { id } });
  res.status(200).send(`The room with id ${id} has been deleted.`);
  await next;
};

const update = async (req, res, next) => {
  const { id } = req.params;

  if (!(typeof id === 'string')) {
    throw new TypeError('Value of "{\n  id\n}" violates contract.\n\nExpected:\n{\n  id: string\n}\n\nGot:\n' + _inspect({ id }));
  }

  const updateData = Object.assign({}, req.body);

  if (!(updateData != null && typeof updateData.capacity === 'string')) {
    throw new TypeError('Value of variable "updateData" violates contract.\n\nExpected:\n{\n  capacity: string\n}\n\nGot:\n' + _inspect(updateData));
  }

  const room = await _index2.default.Rooms.findOne({ where: { id } });
  if (room == null) {
    res.status(400).send(`The room with id ${id} doesn't exist.`);
    await next;
  }
  await Rooms.update(updateData, { where: { id } });
  res.send(`The room with id ${id} has been updated.`).status(204);
  await next;
};

exports.default = {
  list,
  create,
  del,
  update,
  get
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