import {
    getAllContacts as getAllContactsService,
    getContactById as getContactByIdService,
    createContact as createContactService,
    updateContact as updateContactService,
    deleteContact as deleteContactService
  } from '../services/contacts.js';
  import httpErrors from 'http-errors';
  import Contact from '../models/contact.js';


  export const getAllContacts = async (req, res, next) => {
    try {
      const { page = 1, perPage = 10, sortBy = 'name', sortOrder = 'asc', type, isFavourite } = req.query;

      const skip = (page - 1) * perPage;
      const sort = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };

      const filters = { userId: req.userId }; // Filter by userId
      if (type) filters.contactType = type;
      if (isFavourite !== undefined) filters.isFavourite = isFavourite === 'true';

      const [contacts, totalItems] = await Promise.all([
        getAllContactsService(filters, sort, skip, perPage),
        Contact.countDocuments(filters),
      ]);

      res.status(200).json({
        status: 200,
        message: 'Successfully found contacts!',
        data: {
          data: contacts,
          page: Number(page),
          perPage: Number(perPage),
          totalItems,
          totalPages: Math.ceil(totalItems / perPage),
          hasPreviousPage: page > 1,
          hasNextPage: page * perPage < totalItems,
        },
      });
    } catch (error) {
      next(error);
    }
  };

  export const getContactById = async (req, res, next) => {
    try {
      const contact = await getContactByIdService(req.userId, req.params.contactId);
      if (!contact) {
        throw httpErrors(404, 'Contact not found');
      }
      res.status(200).json({
        status: 200,
        message: `Successfully found contact with id ${req.params.contactId}!`,
        data: contact,
      });
    } catch (error) {
      next(error);
    }
  };

  export const createContact = async (req, res, next) => {
    try {
      const contactData = {
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        contactType: req.body.contactType,
        isFavourite: req.body.isFavourite || false,
        userId: req.userId,
      };


      if (req.file) {
        contactData.photo = req.file.path;
      }

      const newContact = await createContactService(contactData);
      res.status(201).json({
        status: 201,
        message: 'Successfully created a contact!',
        data: {
          _id: newContact._id,
          name: newContact.name,
          phoneNumber: newContact.phoneNumber,
          email: newContact.email,
          contactType: newContact.contactType,
          isFavourite: newContact.isFavourite,
          userId: newContact.userId,
          photo: newContact.photo,
        },
      });
    } catch (error) {
      next(error);
    }
  };
  export const updateContact = async (req, res, next) => {
    try {
      const updateData = {
        ...req.body,
      };


      if (req.file) {
        updateData.photo = req.file.path; 
      }

      const updatedContact = await updateContactService(req.userId, req.params.contactId, updateData);
      if (!updatedContact) {
        throw httpErrors(404, 'Contact not found');
      }

      res.status(200).json({
        status: 200,
        message: 'Successfully patched a contact!',
        data: updatedContact,
      });
    } catch (error) {
      next(error);
    }
  };
  export const deleteContact = async (req, res, next) => {
    try {
      const deletedContact = await deleteContactService(req.userId, req.params.contactId);
      if (!deletedContact) {
        throw httpErrors(404, 'Contact not found');
      }
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
