import Contact from '../models/contact.js';

export const getAllContacts = async () => {
  return await Contact.find();
};

export const getContactById = async (id) => {
  return await Contact.findById(id);
};


export const createContact = async (contactData) => {
  const newContact = new Contact(contactData);
  await newContact.save();
  return newContact;
};

export const updateContact = async (id, updateData) => {
  return await Contact.findByIdAndUpdate(id, updateData, { new: true });
};

export const deleteContact = async (id) => {
  return await Contact.findByIdAndDelete(id);
};
