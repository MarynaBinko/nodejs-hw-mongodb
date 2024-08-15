import jwt from 'jsonwebtoken';
import createHttpError from 'http-errors';
import Session from '../models/session.js';

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

export const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      throw createHttpError(401, 'Refresh token is missing');
    }

    const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
    const session = await Session.findOne({ userId: decoded.userId, refreshToken });

    if (!session) {
      throw createHttpError(401, 'Invalid refresh token');
    }

    const newAccessToken = jwt.sign({ userId: session.userId }, ACCESS_TOKEN_SECRET, { expiresIn: '15m' });

    session.accessToken = newAccessToken;
    session.accessTokenValidUntil = new Date(Date.now() + 15 * 60 * 1000);
    await session.save();

    res.status(200).json({ status: 200, accessToken: newAccessToken });
  } catch (error) {
    next(error);
  }
};
