
const User = require('../models/user');
const Token = require("../models/token");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
///////////////added for login authentication - sharvari
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

////////////////
const test = (req, res) => {
  try {
    res.status(200).json({ message: 'Test is working' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const registerUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      dateOfBirth,
      gender,
      department,
      subject,
      status,
      email,
      selectedCountry,
      about,
      image,
      fourDigitValue,
      password,
      confirmPassword
    } = req.body;
    console.log(req.file)
    // Check required fields
    if (!firstName || !lastName || !dateOfBirth || !gender || !department || !subject || !status || !email || !selectedCountry || !about || !password || !fourDigitValue || !confirmPassword || !req.file) {
      return res.status(400).json({ error: 'All fields are required.' });
    }
    // Check name length
    if (firstName.length < 3 || lastName.length < 3) {
      return res.status(400).json({ error: 'First name and last name should be at least 3 characters long.' });
    }
    // Check date of birth
    const today = new Date();
    const dob = new Date(dateOfBirth);
    if (dob >= today) {
      return res.status(400).json({ error: 'Date of birth cannot be today or in the future.' });
    }

    // Check email format
    const emailRegex = /.+@syr\.edu$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Email must end with "@syr.edu".' });
    }

    // Check if fourDigitValue represents a valid year (e.g., between 1900 and the current year)
    if (isNaN(fourDigitValue)) {
      return res.status(400).json({ error: 'Four digit value must be a number.' });
    }

    const currentYear = new Date().getFullYear();
    const tenYearsFromNow = currentYear + 10;
    if (fourDigitValue < 1900 || fourDigitValue > tenYearsFromNow) {
      return res.status(400).json({ error: 'Four digit value must be a valid year.' });
    }

    //check image type
    if (!req.file || !['image/jpeg', 'image/png', 'image/webp'].includes(req.file.mimetype)) {
      console.log(req.file.mimetype)
      return res.status(400).json({ error: 'Only JPG, PNG, and WEBP images are allowed.' });
    }

    // Check password strength
    const minLength = 6;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    if (password.length < minLength || !(hasUpperCase && hasLowerCase && hasNumber)) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, and one number.' });
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Password and confirm password do not match.' });
    }

    // Check if user already exists
    let exist = await User.findOne({ email });
    if (exist) {
      return res.status(400).json({ error: 'Email is already taken.' });
    }

    // Create new user
    const user = await User.create({
      firstName,
      lastName,
      dateOfBirth,
      gender,
      department,
      subject,
      status,
      email,
      selectedCountry,
      about,
      image: req.file.filename,
      fourDigitValue,
      password,
      confirmPassword
    });
    // if (!user.verified){
    //   let token = await Token.findOne({userId: user._});
    //   if(!token) {
    //   token = await new Token({
    //   userId: user._id,
    //   token: crypto.randomBytes(32).toString("hex"),
    //   }).save();
    //   const url = '${process.env.BASE_URL}users/${user._id}/verify/${token.token}';
    //   await sendEmail(user.email, "Verify Email",url);
    //   }
    //   return res.status(400).send({message:"An email is sent to your account,please verify"});
    // }

    const token = await new Token({
      userId: user._id,
      token: crypto.randomBytes(32).toString("hex")
    }).save();
    const url = `${process.env.BASE_URL}/${user._id}/verify/${token.token}`;
    await sendEmail(user.email, "Verify Email", url);
    // Return success response
    res.status(201).json({ message: 'An email has been sent to your account, please verify', user });
    console.log(req.file.mimetype)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


//added to implemennt login authentication
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check if the password is correct
    // const isMatch = await bcrypt.compare(password, user.password);
    if (password !== user.password) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE || '1h', // or whatever expiry you prefer
    });

    // Send the token in the response
    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        // Include any other user info you want to return
      },
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


module.exports = {
  test,
  registerUser,
  loginUser 
};
