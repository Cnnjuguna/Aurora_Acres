import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body; //First we destructure the username, email & password
  const hashedPassword = bcryptjs.hashSync(password, 10); //Then we hash the password
  const newUser = new User({ username, email, password: hashedPassword }); //We instantiate a new User and add the data for the username, email...
  try {
    res.setHeader('Content-Type', 'application/json');
    await newUser.save();
    res
      .status(201)
      .json({ success: true, message: 'User successfully created' });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body; //First we destructure the email & password
  try {
    const validUser = await User.findOne({ email }); //Then we test if the email exists
    if (!validUser) return next(errorHandler(404, 'User not found!')); // if it does not exist we  give the user the response 404
    const validPassword = bcryptjs.compareSync(password, validUser.password); // We also check the password entered against the hashed one in the db
    if (!validPassword) return next(errorHandler(401, 'Wrong credentials!')); // If it does not exist we return a 401 response
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie('access_token', token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error); //Using Middleware and our tey and catch statement we give the user the appropriate error message
  }
};
