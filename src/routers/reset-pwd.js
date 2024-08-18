router.post('/reset-pwd', validateBody(yourValidationSchema), async (req, res, next) => {
    try {
      const { token, password } = req.body;

      const { email } = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findOne({ email });

      if (!user) {
        throw createHttpError(404, "User not found!");
      }

      // Update the user's password (ensure you hash the password)
      user.password = await bcrypt.hash(password, 10);
      await user.save();

      // Invalidate the user's sessions, if applicable
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

  module.exports = router;
