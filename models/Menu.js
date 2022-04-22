const mongoose=require('mongoose');

const menuSchema = new mongoose.Schema({
    name:String,
    price:Number,
    description:String
});

module.exports = mongoose.model('Menu',menuSchema);