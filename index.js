const express=require('express');
const port =8002;
const path =require('path')
const app =express();
const routes =require('./routes/adminRouts')
const controller =require('./controller/adminController')
// const db = require('./config/mongoose');
const flash= require('connect-flash');
const middlewere =require('./config/middlewere');
const bcrypt =require('bcrypt');

const mongoose = require('mongoose')

const url = `mongodb+srv://dhruvil:henimiyani1234@cluster0.udkaapr.mongodb.net/blog?retryWrites=true`;
// const url= mongoose.connect('mongodb:/dhruvil:henimiyani1234@host:port/blogs?options...');

mongoose.connect(url,{
  useNewUrlParser: true,
  useUnifiedTopology: true 
})
  
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })


app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'))

app.use(express.urlencoded());
app.use(express.static('assets'));

app.use('/uploads',express.static(path.join(__dirname,'uploads')));

const session =require('express-session');
const passport =require('passport');
const passportLocal = require('./config/passport_local');
const cookieParser = require('cookie-parser');


app.use(session({
    name : "RNW",
    secret : "codeAdmin",
    resave : false,
    saveUninitialized : false,
    cookie : {
        maxAge : 10000*60*60
    }
}));

app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.dataShowinPages);

app.use(flash());
app.use(middlewere.setflash);


app.use('/',require('./routes/adminRouts'));
app.use('/user',require('./routes/userroutes/userroutes'));

app.listen(port ,(err)=>{
    if(err){
        console.log(err);
        return false;
    }
    console.log('server runinig in port :'+port);
})


