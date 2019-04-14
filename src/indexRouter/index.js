import {Router} from 'express';

import patients from '../patients/index';
import rooms from '../rooms/index';
import records from '../records/index';
import medicaments from '../medicaments/index';
import employees from '../employees/index';

const indexRouter = Router();

indexRouter.use(patients.route);
indexRouter.use(rooms.route);
indexRouter.use(records.route);
indexRouter.use(medicaments.route);
indexRouter.use(employees.route);

export default indexRouter;