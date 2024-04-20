const User = require('../models/user');

const getAllUsers = async (req, res) => {
  try {
      const users = await User.find({});
      
      res.status(200).json(users);
  } catch (error) {
      res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
};

const searchUsers = async (req, res) => {
  try {
    const { name, graduationYear, department} = req.query;

    // Building the query based on provided filters
    let query = {};

    if (name) {
      const regex = new RegExp(`^${name}`, 'i'); // '^' anchors to the start of the string
      query.$or = [
        { firstName: { $regex: regex } },
        { lastName: { $regex: regex } }
      ];
    }

    if (graduationYear) {
      query.graduationYear = graduationYear;
    }

    if (department) {
      query.department = department;
    }

    const users = await User.find(query);
    res.status(200).json(users);
  } catch (error) {
    console.error('Search Users Error:', error);
    res.status(500).json({ error: 'Internal server error during user search' });
  }
};

module.exports = {
  getAllUsers,
  searchUsers

};