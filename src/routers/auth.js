
import express from 'express';
import { registerUser, loginUser } from '../controllers/auth.js';
import { refreshToken } from '../controllers/refreshToken.js';
import { logoutUser } from '../controllers/logoutUser.js';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import createHttpError from 'http-errors';
import User from '../models/user.js';
import validateBody from '../middlewares/validateBody.js';
import { resetEmailSchema, resetPasswordSchema } from '../validation/contactSchemas.js';
import bcrypt from 'bcrypt';
import Session from '../models/session.js';

const router = express.Router();


router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/refresh', refreshToken);
router.post('/logout', logoutUser);


router.post('/send-reset-email', validateBody(resetEmailSchema), async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      throw createHttpError(404, "User not found!");
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '5m' });

    const resetLink = `${process.env.APP_DOMAIN}/reset-password?token=${token}`;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: email,
      subject: "Password Reset",
      text: `Click the link to reset your password: ${resetLink}`,
      html: `<p>Click the link to reset your password: <a href="${resetLink}">${resetLink}</a></p>`,
    });

    res.status(200).json({
      status: 200,
      message: "Reset password email has been successfully sent.",
      data: {},
    });
  } catch (error) {
    if (!error.status) {
      error = createHttpError(500, "Failed to send the email, please try again later.");
    }
    next(error);
  }
});


router.post('/reset-pwd', validateBody(resetPasswordSchema), async (req, res, next) => {
  try {
    const { token, password } = req.body;

    const { email } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ email });

    if (!user) {
      throw createHttpError(404, "User not found!");
    }

    user.password = await bcrypt.hash(password, 10);
    await user.save();

    await Session.deleteMany({ user: user._id });

    res.status(200).json({
      status: 200,
      message: "Password has been successfully reset.",
      data: {},
    });
  } catch (error) {
    if (error.name === 'TokenExpiredError' || error.name === 'JsonWebTokenError') {
      error = createHttpError(401, "Token is expired or invalid.");
    }
    next(error);
  }
});

export default router;


