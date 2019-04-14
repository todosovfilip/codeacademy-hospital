import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import logger from 'morgan';
import helmet from 'helmet';
import unless from 'express-unless';
import indexRouter from './indexRouter/index';

const app = express();
const port = process.env.PORT || 3702;

app.use(logger('dev'));
app.use(cors());
app.use(helmet());
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json());

app.use(indexRouter);



app.listen(port, () =>{
    console.log(`API is listening on port ${port}`)
});