
import express from 'express';
import {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
} from '../controllers/contacts.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import validateBody from '../middlewares/validateBody.js';
import { createContactSchema, updateContactSchema } from '../validation/contactSchemas.js';
import isValidId from '../middlewares/isValidId.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import upload from '../middlewares/upload.js';

const router = express.Router();


router.use(authMiddleware);


router.get('/', ctrlWrapper(getAllContacts));


router.get('/:contactId', isValidId, ctrlWrapper(getContactById));


router.post(
  '/',
  upload.single('photo'),
  validateBody(createContactSchema),
  ctrlWrapper(createContact)
);

router.patch(
  '/:contactId',
  isValidId,
  upload.single('photo'),  
  validateBody(updateContactSchema),
  ctrlWrapper(updateContact)
);



router.delete('/:contactId', isValidId, ctrlWrapper(deleteContact));

export default router;
