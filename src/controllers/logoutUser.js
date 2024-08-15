export const logoutUser = async (req, res, next) => {
    try {
      const { refreshToken } = req.cookies;

      if (refreshToken) {
        await Session.findOneAndDelete({ refreshToken });
      }

      res.clearCookie('refreshToken');
      res.status(200).json({ status: 200, message: 'Successfully logged out' });
    } catch (error) {
      next(error);
    }
  };
