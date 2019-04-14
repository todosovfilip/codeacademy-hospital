import {Router} from 'express';
import actions from './actions';

const employeeRouter = Router();

employeeRouter.post('/employees', actions.create);
employeeRouter.get('/employees', actions.list);
employeeRouter.get('/employees/:id', actions.get);
employeeRouter.delete('/employees/:id', actions.del);
employeeRouter.put('/employees/:id', actions.update);

export default employeeRouter;