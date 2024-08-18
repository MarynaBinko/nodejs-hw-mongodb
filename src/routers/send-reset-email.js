const express = require('express');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const createHttpError = require('http-errors');
const { User } = require('../models/user'); // Adjust the path based on your project structure
const validateBody = require('../middlewares/validateBody'); // Adjust based on your middleware structure

const router = express.Router();

router.post('/send-reset-email', validateBody(yourValidationSchema), async (req, res, next) => {
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

module.exports = router;
