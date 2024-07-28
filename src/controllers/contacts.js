import {
    getAllContacts as getAllContactsService,
    getContactById as getContactByIdService,
    createContact as createContactService,
    updateContact as updateContactService,
    deleteContact as deleteContactService
  } from '../services/contacts.js';
  import httpErrors from 'http-errors';

  export const getAllContacts = async (req, res, next) => {
    try {
      const contacts = await getAllContactsService();
      res.status(200).json({
        status: 200,
        message: 'Successfully found contacts!',
        data: contacts,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  };

  export const getContactById = async (req, res, next) => {
    try {
      const contact = await getContactByIdService(req.params.contactId);
      if (!contact) {
        throw httpErrors(404, 'Contact not found');
      }
      res.status(200).json({
        status: 200,
        message: `Successfully found contact with id ${req.params.contactId}!`,
        data: contact,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  };

  export const createContact = async (req, res, next) => {
    try {
      const newContact = await createContactService(req.body);
      res.status(201).json({
        status: 201,
        message: 'Successfully created a contact!',
        data: newContact,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  };

  export const updateContact = async (req, res, next) => {
    try {
      const updatedContact = await updateContactService(req.params.contactId, req.body);
      if (!updatedContact) {
        throw httpErrors(404, 'Contact not found');
      }
      res.status(200).json({
        status: 200,
        message: 'Successfully patched a contact!',
        data: updatedContact,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  };

  export const deleteContact = async (req, res, next) => {
    try {
      const deletedContact = await deleteContactService(req.params.contactId);
      if (!deletedContact) {
        throw httpErrors(404, 'Contact not found');
      }
      res.status(204).send();
    } catch (error) {
      console.error(error);
      next(error);
    }
  };
