// routes/userRoutes.js
const express = require('express')
const router = express.Router();
const cors = require('cors')
const {getAllUsers} = require('../controllers/userController')


//middleware
router.use(
    cors({
        credentials: true,
        origin: "http://localhost:5173"
    })
)


router.get('/users', getAllUsers);

module.exports = router;
