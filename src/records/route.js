import {Router} from 'express';
import actions from './actions';

const recordRouter = Router();

recordRouter.post('/records', actions.create);
recordRouter.delete('/records/:id', actions.del);
recordRouter.get('/records', actions.list);
recordRouter.get('/records/:id', actions.get);
recordRouter.put('/records/:id', actions.update);

export default recordRouter;