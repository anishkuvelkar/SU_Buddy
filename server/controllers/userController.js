const User = require('../models/user');
const getAllUsers = async (req, res) => {
  try {
    // Assuming 'verified' is a boolean field in your user model
    const verifiedUsers = await User.find({ verified: true });
    res.json(verifiedUsers);
  } catch (error) {
    console.error('Get All Users Error:', error);
    res.status(500).json({ error: 'Internal server error during user retrieval' });
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