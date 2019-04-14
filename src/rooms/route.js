import {Router} from 'express';
import actions from './actions';

const roomRoute = Router();

roomRoute.get('/rooms', actions.list);
roomRoute.get('/rooms/:id', actions.get);
roomRoute.post('/rooms', actions.create);
roomRoute.delete('/rooms/:id', actions.del);
roomRoute.put('/rooms/:id', actions.update);

export default roomRoute;