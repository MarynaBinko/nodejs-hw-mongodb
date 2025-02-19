import { registerUserService, loginUserService } from '../services/auth.js';

export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const user = await registerUserService({ name, email, password });
    res.status(201).json({
      status: 201,
      message: 'Successfully registered a user!',
      data: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { accessToken, refreshToken } = await loginUserService({ email, password });

    if (!accessToken || !refreshToken) {
      throw new Error('Failed to generate tokens');
    }

    res.cookie('refreshToken', refreshToken, { httpOnly: true });
    res.status(200).json({
      status: 200,
      message: 'Successfully logged in a user!',
      data: { accessToken },
    });
  } catch (error) {
    next(error);
  }
};




