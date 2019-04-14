import hat from 'hat';
import Sequelize from 'sequelize';
import models from '../models/index';

const Medicaments = models.Medicaments;

const create = async (req, res, next) =>{
  const {
    code,
    price
  }:{
    code:string,
    price:string
  } = req.body;
  const result = await Medicaments.findAll({where: {code}});
  if(result.length!=0){
    res.status(400).send(`Medicament with this code already exists.`);
    await next;
  }

  const medicamentId = hat();
  await Medicaments.create({
    id: medicamentId,
    code,
    price
  });  
  res.status(201).send(`The medicament with code ${code} and id ${medicamentId} has been created.`);
  await next;
}

const get = async (req, res, next) =>{
  const {id}:{id:string} = req.params;
  const result = await Medicaments.findAll({where: {id}});
  if(result.length!=0){
    res.status(200).send(result);
    await next;
  }
  res.status(400).send(`No medicament was found with id ${id}.`);
  await next;
}

const list = async (req, res, next) =>{
  const result = await Medicaments.findAll();
  res.status(200).send(result);
  await next;
}

const del = async (req, res, next) =>{
  const {id}:{id:string} = req.params;
  const result = await Medicaments.findAll({where: {id}});
  if(result.length!=0){
    await Medicaments.destroy({where: {id}});
    res.status(200).send(`The medicament with id ${id} has been deleted.`);
    await next;
  }
  res.status(400).send(`No  medicament was found with id ${id}.`);
  await next;
}

const update = async (req, res, next) =>{
  const {id}:{id:string} = req.params;

  const updateData:{
    code:?string,
    price:?string
  } = Object.assign({}, req.body);

  const result = await Medicaments.findAll({where: {id}});
  if(result.length!=0){
    await Medicaments.update(updateData, {where: {id}});
    res.send(`The medicament with id ${id} has been successfully updated.`).status(202);
    await next;
  }
  res.status(400).send(`No  medicament was found with id ${id}.`);
  await next;
}

const findByCode = async (req,res,next) =>{
  const {code}:{code:string} = req.params;
  const result = await Medicaments.find({where:{code}});

  if(result!=null){
    res.status(200).send(result);
    await next;
  }
  res.status(400).send(`No medicament was found with code ${code}.`);
  await next;
};

export default {
  create,
  get,
  list,
  del,
  update,
  findByCode
}