
const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contacts');
const ctrlWrapper = require('../utils/ctrlWrapper');

router.get('/contacts', ctrlWrapper(contactsController.getAllContacts));
router.get('/contacts/:contactId', ctrlWrapper(contactsController.getContactById));
router.post('/contacts', ctrlWrapper(contactsController.createContact));
router.patch('/contacts/:contactId', ctrlWrapper(contactsController.updateContact));
router.delete('/contacts/:contactId', ctrlWrapper(contactsController.deleteContact));

module.exports = router;
