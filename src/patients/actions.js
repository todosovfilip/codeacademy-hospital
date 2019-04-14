import hat from 'hat';
import Sequelize from 'sequelize';
import models from '../models/index';

const Patients = models.Patients;
const Op = Sequelize.Op;

const get = async (req, res, next) =>{
    const {id} = req.params;
    const result = await Patients.findOne(
        {
            include:[
            {
                model: models.Records,
                as:'Records'
            }
        ]
        },
        {where: {id}});

    res.status(200).send(result);
    await next;
}

const list = async (req, res, next) =>{
    const result = await Patients.findAll(
        {
            include:[
            {
                model: models.Records,
                as:'Records'
            }
        ]
        }
    );
    res.status(200).send(result);
    await next;
}

const create = async (req, res, next) =>{
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
    }:{
        firstName:string,
        lastName:string,
        dateOfBirth:string,
        sex:string,
        address:string,
        phone:string,
        email:string,
        dateAdmitted:?string,
        dateReleased:?string,
        roomId:?string,
        EmployeeId:?string
    } = req.body;

    const patientId = hat();

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
}

const update = async (req, res, next) =>{
    const {id} = req.params;
    const updateData: {
        firstName:?string,
        lastName:?string,
        dateOfBirth:?string,
        sex:?string,
        address:?string,
        phone:?string,
        email:?string,
        dateAdmitted:?string,
        dateReleased:?string,
        roomId:?string,
        EmployeeId: ?string
    } = Object.assign({}, req.body);

    Patients.update(updateData, {where: {id}});
    res.send(`Patient with id ${id} has been updated.`).status(204);

    await next;
}

const today = async (req, res, next) =>{
    const tod = new Date();
    await tod.setHours(0,0,0,0);
    tod.toISOString();
    console.log(tod);
    const result:Array = await Patients.findAll(
        {where: {createdAt : {
            [Op.gte]: tod
    }}});

    res.status(200).send(result);
    await next;
}

const week = async (req, res, next) =>{
    let date = new Date();
    date.setDate(date.getDate() - 7);
    await date.setHours(0,0,0,0);

    const result:Array = await Patients.findAll({where: {createdAt : {
        [Op.gte]: date
    }}});

    res.status(200).send(result);
    await next;
}

export default{
    get,
    list,
    create,
    update,
    today,
    week
}

// {
//     include:[
//     {
//         model: models.Records,
//         as:'Records'
//     }
// ]
// }