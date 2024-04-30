const User = require('../models/user');
const jwt = require('jsonwebtoken');

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
   let query = { verified: true };
    // Building the query based on provided filters

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

const getCurrentUser = async (req, res) => {
  try {
    // Extract the token from the request headers
    const token = req.headers.authorization;
    console.log(token)

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: Missing token' });
    }

    // Remove the 'Bearer ' prefix from the token
    const tokenWithoutPrefix = token.replace('Bearer ', '');
    console.log(tokenWithoutPrefix)
    // Decode the token to extract user ID
    const userId = decodeTokenAndGetUserId(tokenWithoutPrefix);
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
      console.log("anish")
    }

    // Assuming you have a function to fetch user details from the database
    const user = await getUserDetails(userId);
    console.log(user)

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // If everything is successful, send the user's profile as the response
    res.json({ user });
    console.log("checking 2")
  } catch (error) {
    console.error('Error fetching user profile:', error);

    // Handle specific error types
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Unauthorized: Token expired' });
      console.log("check")
    } else if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
      console.log("check")
    }

    // Generic server error response
    res.status(500).json({ message: 'Server error' });
  }
};

async function getUserDetails(userId) {
  try {
    // Query the database to find the user by userId
    const user = await User.findById(userId);

    return user; // Return the user object if found
  } catch (error) {
    // Handle any errors that occur during the database query
    console.error('Error fetching user details:', error);
    return null; // Return null if an error occurs
  }
}


// Function to decode token and extract user ID
function decodeTokenAndGetUserId(token) {
  try {
    // Decode the token to extract its payload (claims)
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    
    // Extract user ID from the decoded token
    const userId = decodedToken.userId;
   console.log(userId)
    return userId;
  } catch (error) {
    // If the token is invalid or expired, jwt.verify will throw an error
    console.error('Error decoding token:', error);
    return null;
  }
}

module.exports = {
  getAllUsers,
  searchUsers,
  getCurrentUser
};