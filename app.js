const express = require('express');
const app = express();
const port = 80;
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const User = require('./models/UserInfo');
const Menu = require('./models/Menu');
const mongoose=require('mongoose');
const { findById, findOne } = require('./models/UserInfo');

main().catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://localhost:27017/Canteen');
    console.log("Successfully Connected With DataBase");
}



app.engine('ejs',ejsMate);
app.set('view engine','ejs') ;
app.set('views',path.join(__dirname,'views')); 

app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname,'public')));

app.get('/',(req,res)=>{
    res.render('Canteen.ejs');
});
app.get('/home',(req,res)=>{
    res.render('home.ejs');
});
app.get('/login',(req,res)=>{
    res.render('login.ejs');
});
app.post('/login',async(req,res)=>{
    try {
        const email = req.body.email;
        const pass = req.body.password;
        const userEmail = await User.findOne({email:email});
        if (userEmail.password === pass){
            res.redirect('home');
        }
        else{
            res.redirect("login");
        }
    } catch (e) {
        res.send(e);
    }
});
app.get('/signup',(req,res)=>{
    res.render('signup.ejs');
});
app.post('/signup',async (req,res)=>{
    try {
    const user = new User(req.body);
    await user.save();
    res.redirect('login');
    } catch (error) {
        console.log(error);
        res.redirect('signup');
    }
    
});
app.get('/menu',async(req,res)=>{
    const menuItems = await Menu.find({});
    res.render('menu',{menuItems});
});
app.post('/menu',async (req,res)=>{
    try{
       const menu = new Menu(req.body);
       await menu.save();
       res.redirect('menu');
   }
   catch(error){
       res.redirect('addItemToMenu');
   }
});
app.get('/menu/new',(req,res)=>{
    res.render('addItemToMenu');
});
app.get('/cart',(req,res)=>{
    res.render('cart');
});
app.all('*',(req,res,next)=>{
    res.render('Error');
});

app.listen(port,()=>{
    console.log(`Listening on Port "${port}"`);
});