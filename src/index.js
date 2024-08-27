import { setupServer } from './server.js';
import initMongoConnection from './db/initMongoConnection.js';
import dotenv from 'dotenv';
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

dotenv.config();

const startApp = async () => {
  try {
    // Initialize MongoDB connection
    await initMongoConnection();

    // Set up the server
    const app = setupServer();

    // Start the server
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start the application:', error);
  }
};

startApp();







