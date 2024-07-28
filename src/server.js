
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const contactsRouter = require('./routers/contacts');
const errorHandler = require('./middlewares/errorHandler');
const notFoundHandler = require('./middlewares/notFoundHandler');

const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());

app.use('/api', contactsRouter);

app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


