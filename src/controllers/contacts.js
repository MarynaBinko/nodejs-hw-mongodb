// src/controllers/contacts.js
const contactsService = require('../services/contacts');
const httpErrors = require('http-errors');

const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await contactsService.getAllContacts();
    res.status(200).json({ status: 200, message: 'Success', data: contacts });
  } catch (err) {
    next(err);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const contact = await contactsService.getContactById(req.params.contactId);
    if (!contact) {
      throw httpErrors(404, 'Contact not found');
    }
    res.status(200).json({ status: 200, message: 'Success', data: contact });
  } catch (err) {
    next(err);
  }
};

const createContact = async (req, res, next) => {
  try {
    const newContact = await contactsService.createContact(req.body);
    res.status(201).json({ status: 201, message: 'Successfully created a contact!', data: newContact });
  } catch (err) {
    next(err);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const updatedContact = await contactsService.updateContact(req.params.contactId, req.body);
    if (!updatedContact) {
      throw httpErrors(404, 'Contact not found');
    }
    res.status(200).json({ status: 200, message: 'Successfully patched a contact!', data: updatedContact });
  } catch (err) {
    next(err);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const deletedContact = await contactsService.deleteContact(req.params.contactId);
    if (!deletedContact) {
      throw httpErrors(404, 'Contact not found');
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact
};
