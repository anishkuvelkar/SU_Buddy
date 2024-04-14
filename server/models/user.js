const mongoose = require('mongoose')
const {Schema} = mongoose

const userSchema = new Schema({
    firstName:{type: String, required: true},
    lastName: {type: String, required: true},
    dateOfBirth: {type: Date, required: true},
    gender: {type: String, required: true},
    department: {type: String, required: true},
    subject: {type: String, required: true},
    status: {type: String, required: true},
    email: { type: String,unique: true, required: true},
    selectedCountry: {type: String, required: true},
    about:  {type: String,required: true},
    image: {type: String,required: true},
    password: {type: String, required: true},
    confirmPassword: {type: String, required: true},
    verified:{type : Boolean, default: false}
});

const UserModel = mongoose.model('User',userSchema);

module.exports = UserModel;