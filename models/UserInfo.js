const mongoose=require('mongoose');

const userSchema = new mongoose.Schema({
    username:String,
    mobile:Number,
    email:String,
    password:String
});

module.exports = mongoose.model('User',userSchema);