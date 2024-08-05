import mongoose from 'mongoose';
import httpErrors from 'http-errors';

const isValidId = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.contactId)) {
    return next(httpErrors(400, 'Invalid contact ID'));
  }
  next();
};

export default isValidId;
