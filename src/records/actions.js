import hat from 'hat';
import Sequelize from 'sequelize';
import models from '../models/index';
import nodemailer from 'nodemailer';

const Records = models.Records;
const Patients = models.Patients;

const create = async (req, res, next) => {
  const {
    patientId,
    description
  }:{
    patientId:?string,
    description:?string
  } = req.body;

  const recordId = hat();
  await Records.create({
    id:recordId,
    patientId,
    description
  });
  const thePatient = await Patients.findOne({where:{id:patientId}});

  
  const account = await nodemailer.createTestAccount();

  const mailerTransporter = nodemailer.createTransport({
   service: 'gmail',
   host: 'smtp.gmail.com',
   port: 587,
   secure: true,
   auth: {
     user: 'codeacademyhospital@gmail.com',
     pass: 'q23a6urRQDfSZV3'
   },
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
   
 }
  if(thePatient.email !=null){
   mailerTransporter.sendMail(mailOptions, (err, response) => {
   if (err) {
     console.error('There was an error', err);
   } else {
     console.log('Mail was sent');
   }
 })}
    
  res.status(201).send(`A record with id ${recordId} for patient with id ${patientId} has been created.`);
  await next;
}

const del = async (req, res, next) =>{
  const {id}:{id:string} = req.params;
  await Records.destroy({where: {id}});
  res.status(200).send(`The record with id ${id} has been deleted.`);
  await next;
}

const get = async (req, res, next) =>{
  const {id}:{id:string} = req.params;
  const record = await Records.findOne({
    include:[
      {
          model: models.Patients,
          as:'patient'
      }
  ],
  where: {id}
  });
  res.send(record).status(200);
  await next;
}

const list = async (req, res, next) =>{
  const result = await Records.findAll({
    include:[
      {
          model: models.Patients,
          as:'patient'
      }
  ]
  });
  res.send(result).status(200);
  await next;
}

const update = async (req, res, next) =>{
  const {id}:{id:string} = req.params;

  const updateData:{
    description:string
  } = Object.assign({},req.body);

  await Records.update(updateData, {where: {id}});
  res.send(`Record with id ${id} has been updated.`).status(204);
  await next;
}

export default {
  create,
  del,
  get,
  list,
  update
}

