import {Router} from 'express';
import actions from './actions';

const patientRoute = Router();

patientRoute.get('/patients', actions.list);
patientRoute.get('/patients/:id',actions.get);
patientRoute.get('/patients/other/today', actions.today);   
patientRoute.get('/patients/other/week', actions.week);   
patientRoute.post('/patients', actions.create);
patientRoute.put('/patients/:id', actions.update);

export default patientRoute;