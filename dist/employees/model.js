'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = (sequelize, DataType) => {
  const Employee = sequelize.define('Employees', {
    id: {
      type: DataType.STRING,
      primaryKey: true
    },
    firstName: {
      type: DataType.STRING,
      allowNull: false
    },
    lastName: {
      type: DataType.STRING,
      allowNull: false

    },
    dateOfEmployment: {
      type: DataType.DATE,
      allowNull: false

    },
    sex: {
      type: DataType.STRING,
      allowNull: false

    },
    salary: {
      type: DataType.INTEGER,
      allowNull: false

    },
    address: {
      type: DataType.STRING,
      allowNull: false

    },
    email: {
      type: DataType.STRING

    },
    phone: {
      type: DataType.STRING

    },
    specialty: {
      type: DataType.STRING,
      allowNull: false

    }
  });
  return Employee;
};