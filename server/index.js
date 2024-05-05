const express = require('express');
const dotenv = require('dotenv').config()
const cors = require('cors')
const {mongoose} = require('mongoose')
const app = express();
const path = require('path');
const http = require('http');
app.use('/images', express.static(path.join(__dirname, 'images')));

//database connection
mongoose.connect(process.env.MONGO_URL)
.then(()=> console.log('DB is connected'))
.catch((err)=>console.log('Db not connected',err))

//middleware
app.use(express.json())

app.use('/',require('./routes/authRoutes'))
app.use('/',require('./routes/userRoutes'))
const port = 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
