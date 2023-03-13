import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { API_VERSION_ONE_URL, APP_USE_LIMIT, CORS_OPTIONS, ROUTES, PORT, NODE_ENV } from './src/constants';
import { logger } from './src/config/logger';
import * as messages from './src/constants/messages';

import { connect } from './src/api/model/database';
import versionOneRouter from './src/api/routers';
import { invalidRoute } from './src/helpers';

connect()
const app = express()
app.use(helmet())
app.use(cors(CORS_OPTIONS))
app.use(APP_USE_LIMIT)
app.use(express.json());
app.use(morgan('dev'));

// handle every valid request i.e request to api/v1
app.use(API_VERSION_ONE_URL, versionOneRouter);

app.all(ROUTES.WILD_CARD, invalidRoute)
const loggerThis: any = logger;

if (NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    loggerThis("info", `${messages.CURRENT_TIME_STAMP} Application started on port ${PORT}`);
  })
};

// database connections.

export default app


