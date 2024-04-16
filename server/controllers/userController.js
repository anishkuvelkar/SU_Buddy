// In your user controller file
const User = require('../models/user');

exports.getAllUsers = async (req, res) => {
  try {
      const users = await User.find({});
      
      res.status(200).json(users);
  } catch (error) {
      res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
};

