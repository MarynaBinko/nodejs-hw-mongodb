import Contact from '../models/contact.js';

export const getAllContacts = async (filters, sort, skip, limit) => {
  return Contact.find(filters).sort(sort).skip(skip).limit(limit);
};


export const createContact = async (contactData) => {
  const newContact = new Contact(contactData);
  return newContact.save();
};



export const getContactById = async (userId, contactId) => {
  return Contact.findOne({ _id: contactId, userId });
};

export const updateContact = async (userId, contactId, contactData) => {
  return Contact.findOneAndUpdate({ _id: contactId, userId }, contactData, { new: true });
};

export const deleteContact = async (userId, contactId) => {
  return Contact.findOneAndDelete({ _id: contactId, userId });
};
