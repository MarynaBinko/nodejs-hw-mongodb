import express from 'express';
import { getAllContacts } from '../services/contacts.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const contacts = await getAllContacts();
    res.json({
      status: 'success',
      message: 'Successfully found contacts!',
      data: contacts,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Server error',
    });
  }
});

router.get('/:contactId', async (req, res) => {
    try {
      const contact = await getContactById(req.params.contactId);
      if (!contact) {
        return res.status(404).json({ message: 'Contact not found' });
      }
      res.json({
        status: 200,
        message: `Successfully found contact with id ${req.params.contactId}!`,
        data: contact,
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: 'Server error',
      });
    }
  });

  
export default router;




