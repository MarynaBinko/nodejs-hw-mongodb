import express from 'express';
import morgan from 'morgan';
import contactsRouter from './routers/contacts.js';
import authRouter from './routers/auth.js';
import errorHandler from './middlewares/errorHandler.js';
import notFoundHandler from './middlewares/notFoundHandler.js';

const setupServer = () => {
  const app = express();

  app.use(morgan('dev'));
  app.use(express.json());


  app.use('/auth', authRouter);


  app.use('/contacts', contactsRouter);


  app.use(notFoundHandler);


  app.use(errorHandler);

  return app;
};

export { setupServer };



