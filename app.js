const express = require('express');
const app = express();
const port = 80;
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');

app.engine('ejs',ejsMate);
app.set('view engine','ejs') ;
app.set('views',path.join(__dirname,'views')); 

app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname,'public')));

app.get('/',(req,res)=>{
    res.send('hello');
});
app.get('/file',(req,res)=>{
    const file = 'file';
    res.render('new.ejs',{file});
});
app.get('/login',(req,res)=>{
    res.render('login.ejs');
});

app.listen(port,()=>{
    console.log(`Listening on Port "${port}"`);
});