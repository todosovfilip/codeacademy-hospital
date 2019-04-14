import hat from 'hat';

import models from '../models/index';

const Rooms = models.Rooms;

const list = async (req, res, next) =>{
  const result = await Rooms.findAll({
    include:[
        {
            model: models.Patients,
            as:'patients'
        }
    ]
    });
    if(result)
      res.status(200).send(result);
  res.status(404).send(`No books were found.`);
  await next;
}

const get = async (req, res, next) =>{
  const {id}:{id:string} = req.params;

  const room = await Rooms.findOne(
    
    {
      include:[
          {
              model: models.Patients,
              as:'patients'
          }
      ],
      where: {id}
      });

      if(room==null){
        res.status(400).send(`The room with id ${id} doesn't exist.`);
        await next;
    }
    res.status(200).send(room);
    await next;
}

const create = async (req, res, next) =>{
  const {capacity}:{capacity:string} = req.body;
  const roomId = hat();

  await Rooms.create({
    id:roomId,
    capacity
  });
  res.status(201).send(`Room with id ${roomId} has been created.`);
  await next;
}

const del = async (req, res, next) =>{
  const {id}:{id:string} = req.params;
  
  const room = await models.Rooms.findOne({where: {id}});
  if(room==null){
  res.status(400).send(`The room with id ${id} doesn't exist.`);
  await next;
}
  await Rooms.destroy({where: {id}}); 
  res.status(200).send(`The room with id ${id} has been deleted.`)
  await next;
}

const update = async (req, res, next) =>{
  const { id }: { id: string } = req.params;
  const updateData: {
    capacity:string
  } = Object.assign({}, req.body);
  const room = await models.Rooms.findOne({where: {id}});
  if(room==null){
  res.status(400).send(`The room with id ${id} doesn't exist.`);
  await next;
}
  await Rooms.update(updateData, {where: {id}});
  res.send(`The room with id ${id} has been updated.`).status(204);
  await next;
}

export default{
  list,
  create,
  del,
  update,
  get
}