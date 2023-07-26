const express =require('express');

const routes = express.Router();
const controller = require('../controller/adminController');                                                                                             
const passport =require('../config/passport_local');
const admin = require('../model/admin');


routes.get('/dashboard',passport.check,controller.dashboard);

routes.get('/form',passport.check, (req,res)=>{
    return res.render('form')
});

routes.get('/table',passport.check,controller.table);

routes.get('/',(req,res)=>{
    if(req.isAuthenticated()){
        return res.redirect('/dashboard')
    }
    return res.render('login')
});

routes.get('/logout',controller.logout);
routes.get('/changepassword',controller.chengepassword);
routes.post('/chengepassInsert',controller.chengepassInsert);
routes.post('/loginInsertData',passport.authenticate("local",{failureRedirect : "/"}),controller.loginData);

routes.post('/formInsertData',admin.uploadImg,controller.formData);

routes.get('/viewComment',controller.viewComment);
// FORGOT PASSWORD
routes.get('/forgotPassword',(req,res)=>{
    return res.render('forgotpassword')
});
routes.post('/checkMail',controller.checkMail);

routes.get('/otp',(req,res)=>{
    return res.render('otp')
});
routes.post('/checkOtp',controller.checkOtp);

routes.get('/resetPassword',(req,res)=>{
    return res.render('resetPassword');
});
routes.post('/resetPassword',controller.resetPassword);



routes.use('/slider',passport.check,require('../routes/sliderRoutes'));
routes.use('/gallery',passport.check,require('../routes/galleryRoutes'));
routes.use('/blog',passport.check,require('../routes/blogRoutes'));

module.exports = routes;
