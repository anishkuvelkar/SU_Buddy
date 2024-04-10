const User = require('../models/user');

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
      password,
      confirmPassword
    } = req.body;
  console.log(req.file)
    // Check required fields
    if (!firstName || !lastName || !dateOfBirth || !gender || !department || !subject || !status || !email || !selectedCountry || !about || !password || !confirmPassword || !req.file) {
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
    const exist = await User.findOne({ email });
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
      image:req.file.filename,
      password,
      confirmPassword
    });

    // Return success response
    res.status(201).json({ message: 'User registered successfully', user });
    console.log(req.file.mimetype)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  test,
  registerUser
};
