'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = (sequelize, DataType) => {
    const Patient = sequelize.define('patients', {
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
        dateOfBirth: {
            type: DataType.DATE,
            allowNull: false
        },
        sex: {
            type: DataType.STRING,
            allowNull: false
        },
        address: {
            type: DataType.STRING,
            allowNull: false
        },
        phone: {
            type: DataType.STRING,
            allowNull: false
        },
        email: {
            type: DataType.STRING
        },
        dateAdmitted: {
            type: DataType.DATE
        },
        dateReleased: {
            type: DataType.DATE
        },
        roomId: {
            type: DataType.STRING
        }
    });
    return Patient;
};