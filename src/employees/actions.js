import hat from 'hat';
import Sequelize from 'sequelize';
import models from '../models/index';

const Employees = models.Employees;
const Op = Sequelize.Op;

const create = async (req, res, next) =>{
  const{
    firstName,
    lastName,
    dateOfEmployment,
    sex,
    salary,
    address,
    email,
    phone,
    specialty
  }:{
    firstName:string,
    lastName:string,
    dateOfEmployment:string,
    sex:string,
    salary:string,
    address:string,
    email:string,
    phone:string,
    specialty:string
  } = req.body;

  const employeeId = hat();
  await Employees.create({
    id:employeeId,
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
}

const list = async (req, res, next) =>{
  const result = await Employees.findAll(
    {
          include:[
          {
              model: models.Patients,
              as:'patients'
          }
      ]
      }
  );
  res.status(200).send(result);
  await next;
}

const get = async (req, res, next) =>{
  const {id}:{id:string} = req.params;
  const result = await Employees.findOne(
    {
      include:[
        {
          model: models.Patients,
          as: 'patients'
        }
      ]
    },
    {where: {id}});
  if(result)
    res.status(200).send(result);
  res.status(404).send(`No employee was found with the given id.`);
  await next;
}

const del = async (req, res, next) =>{
  const {id}:{id:string} = req.params;
  const result = await Employees.findOne({where:{id}});
  if(result){
  Employees.destroy({where: {id}});
  res.status(200).send(`The employee with id ${id} has been deleted.`);
}
res.status(404).send(`No employee was found with the given id.`);
await next;
}

const update = async (req, res, next) =>{
  const {id}:{id:string} = req.params;
  const updateData: {
    firstName:?string,
    lastName:?string,
    dateOfEmployment:?string,
    sex:?string,
    salary:?string,
    address:?string,
    email:?string,
    phone:?string,
    specialty:?string
    } = Object.assign({}, req.body);

    const result = await Employees.findOne({where:{id}});
    if(result){
    Employees.update(updateData, {where: {id}});
    res.send(`The employee with id ${id} has been successfully updated.`).status(202);
  }
  res.status(404).send(`No employee was found with the given id.`);
  await next;
}

export default{
  create,
  list,
  get,
  del,
  update
}