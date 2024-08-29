import { setupServer } from './server.js';
import initMongoConnection from './db/initMongoConnection.js';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';
import yaml from 'js-yaml';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const startApp = async () => {
  try {
    await initMongoConnection();

    const swaggerPath = path.resolve(__dirname, '../docs/openapi.yaml');
    console.log(`Swagger file path: ${swaggerPath}`);
    const swaggerFile = await fs.readFile(swaggerPath, 'utf8');
    console.log(`Swagger file content: ${swaggerFile}`);
    const swaggerDocument = yaml.load(swaggerFile);
    console.log('Swagger document parsed successfully');

    const app = setupServer();

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start the application:', error);
  }
};

startApp();


