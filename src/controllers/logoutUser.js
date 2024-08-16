import Session from '../models/session.js';
import createHttpError from 'http-errors';

export const logoutUser = async (req, res, next) => {
  try {
  
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return next(createHttpError(400, 'Refresh token is missing'));
    }


    const session = await Session.findOneAndDelete({ refreshToken });

    if (!session) {
      return next(createHttpError(404, 'Session not found or already logged out'));
    }


    res.clearCookie('refreshToken');


    res.status(200).json({
      status: 200,
      message: 'Successfully logged out',
    });
  } catch (error) {
    next(error);
  }
};

