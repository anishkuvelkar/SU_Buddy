const express = require('express')
const router = express.Router();
const cors = require('cors')
const {test,registerUser} = require('../controllers/authController')
const multer = require('multer')


const upload = multer({ dest: 'images/' })
//middleware
router.use(
    cors({
        credentials: true,
        origin: "http://localhost:5173"
    })
)

router.get('/',test)
router.post('/register',upload.single('image'), registerUser)

module.exports = router