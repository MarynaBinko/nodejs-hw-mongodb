// function setupServer
// src/server.js

import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { getAllStudents, getStudentById } from './services/students.js';
import dotenv from "dotenv";
import { env } from './utils/env.js';

dotenv.config();

const PORT = Number(process.env.PORT);;

export const startServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/', (req, res) => {
    res.json({
      message: 'Hello world!',
    });
  });

  app.use('*', (req, res, next) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  app.use((err, req, res, next) => {
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
app.get('/students', async (req, res) => {

});

app.get('/students/:studentId', async (req, res) => {

});
