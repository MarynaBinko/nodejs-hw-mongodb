import { loginUserService } from '../services/auth.js';

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { accessToken, refreshToken } = await loginUserService({ email, password });

    res.cookie('refreshToken', refreshToken, { httpOnly: true });
    res.status(200).json({
      status: 200,
      message: 'Successfully logged in an user!',
      data: { accessToken },
    });
  } catch (error) {
    next(error);
  }
};

