import Contact from '../models/contact.js';

export const getAllContacts = async (filters, sort, skip, limit) => {
  return Contact.find(filters).sort(sort).skip(skip).limit(limit);
};

export const getContactById = async (contactId) => {
  return Contact.findById(contactId);
};

export const createContact = async (contactData) => {
  const newContact = new Contact(contactData);
  return newContact.save();
};

export const updateContact = async (contactId, contactData) => {
  return Contact.findByIdAndUpdate(contactId, contactData, { new: true });
};

export const deleteContact = async (contactId) => {
  return Contact.findByIdAndDelete(contactId);
};
