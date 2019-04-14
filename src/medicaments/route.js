import {Router} from 'express';
import actions from './actions';

const medicamentRouter = Router();

medicamentRouter.post('/medicaments', actions.create);
medicamentRouter.get('/medicaments/:id', actions.get);
medicamentRouter.get('/medicaments', actions.list);
medicamentRouter.delete('/medicaments/:id', actions.del);
medicamentRouter.put('/medicaments/:id', actions.update);
medicamentRouter.get('/medicaments/code/:code', actions.findByCode);
export default medicamentRouter;