const mongoose=require('mongoose');

const menuSchema = new mongoose.Schema({
    name:String,
    price:Number,
    description:String,
    image:String
});

module.exports = mongoose.model('Menu',menuSchema);