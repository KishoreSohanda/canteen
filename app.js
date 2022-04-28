const express = require('express');
const app = express();
const port = 80;
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const User = require('./models/UserInfo');
const Menu = require('./models/Menu');
const flash = require('connect-flash');
const mongoose=require('mongoose');
const { findById, findOne } = require('./models/UserInfo');
const { error } = require('console');

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
            res.redirect('/home');
        }
        else{
            res.redirect("/login");
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
    res.redirect('/login');
    } catch (error) {
        console.log(error);
        res.redirect('/signup');
    }
});
app.get('/menu',async(req,res)=>{
    try {
        const menuItems = await Menu.find({});
        const admin = false;
        const validationFailed = false;
        res.render('menu',{menuItems,admin,validationFailed});
    } catch (error) {
        console.log(error);
        res.redirect('/home');
    }
});
app.get('/menu/admin',async(req,res)=>{
    try{
        const menuItems = await Menu.find({});
        let admin = true;
        let validationFailed = true;
        const adminPassword = "123456"
        const password = req.query.password;
        if(password === adminPassword){
            validationFailed = false;
            res.render('menu',{menuItems,admin,validationFailed});
        }
        else{
            admin=false;
            res.render('menu.ejs',{menuItems,admin,validationFailed});
        }
    }
    catch(error){
        console.log(error);
        res.redirect('/home');
    }
});
app.post('/menu',async (req,res)=>{
    try{
        const menu = new Menu(req.body);
        await menu.save();
        res.redirect('/menu');
    }
    catch(error){
        res.redirect('/menu');
    }   
});
app.get('/menu/new',(req,res)=>{
    res.render('addItemToMenu');
});
app.get('/menu/:id',async(req,res)=>{
    const {id} = req.params;
    const item = await Menu.findById(id);
    res.render('showMenuItem',{item});
});
app.get('/menu/:id/edit',async(req,res)=>{
    const {id} = req.params;
    const item = await Menu.findById(id);
    res.render('editMenuItem',{item});
});
app.patch('/menu/:id',async(req,res)=>{
    const {id} = req.params;
    await Menu.findByIdAndUpdate(id,{...req.body},{new:true});
    res.redirect(`/menu/${id}`);
});
app.delete('/menu/:id',async(req,res)=>{
    const {id} = req.params;
    await Menu.findByIdAndDelete(id);
    res.redirect(`/menu`);
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