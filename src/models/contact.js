import mongoose from 'mongoose';

const { Schema } = mongoose;

const contactSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  contactType: {
    type: String,
    required: true,
  },
  isFavourite: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  photo: {
    type: String, 
  },
});

const Contact = mongoose.model('Contact', contactSchema);
export default Contact;
