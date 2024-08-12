import jwt from 'jsonwebtoken';
import createHttpError from 'http-errors';

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return next(createHttpError(401, 'Authorization header is missing'));
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return next(createHttpError(401, 'Invalid or expired token'));
  }
};

export default authMiddleware;

