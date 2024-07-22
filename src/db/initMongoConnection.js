import mongoose from 'mongoose';

const initMongoConnection = async () => {
  const { MONGODB_CONNECTION_STRING } = process.env;

  try {
    await mongoose.connect(MONGODB_CONNECTION_STRING);
    console.log('Mongo connection successfully established!');
  } catch (error) {
    console.error('Mongo connection error:', error);
  }
};

export default initMongoConnection;


