const express = require('express')
const router = express.Router();
const cors = require('cors');
const {getAllUsers} = require('../controllers/userController')
const { searchUsers } = require('../controllers/userController');
const { getCurrentUser } = require('../controllers/userController');

//middleware
router.use(
    cors({
        credentials: true,
        origin: "http://localhost:5173"
    })
)

router.get('/users/search', searchUsers);
router.get('/users', getAllUsers);
router.get('')

router.get('/api/user', getCurrentUser);

module.exports = router;
