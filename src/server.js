import express from 'express';
import morgan from 'morgan';
import contactsRouter from './routers/contacts.js';
import errorHandler from './middlewares/errorHandler.js';
import notFoundHandler from './middlewares/notFoundHandler.js';

const setupServer = () => {
  const app = express();

  app.use(morgan('dev'));
  app.use(express.json());

  app.use('/contacts', contactsRouter);

  // Handle 404 errors
  app.use(notFoundHandler);

  // Error handling middleware
  app.use(errorHandler);

  return app;
};

export { setupServer };

