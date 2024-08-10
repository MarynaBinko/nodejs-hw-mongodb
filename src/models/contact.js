import mongoose from 'mongoose';

const { Schema } = mongoose;

const contactSchema = new Schema({
  name: String,
  email: String,
  phone: String,
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Contact = mongoose.model('

