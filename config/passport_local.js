
const passport = require('passport');
const passportLocal = require('passport-local').Strategy;
const admin = require('../model/admin');
const bcrypt = require('bcrypt');

passport.use(new passportLocal({
    usernameField: "email"
}, async function (email, password, done) {
    let adminData = await admin.findOne({ email: email });

    if(!adminData || password!=adminData.password){    
        return done(null,false);
      }
      else{
        return done(null,adminData);
      }
    

}))


passport.check = (req, res, next) => {
    if (req.isAuthenticated()) {
        // console.log('ok')
        next();
    }
    else {
        // console.log('not ok')
        return res.redirect('/')
    }
}


passport.serializeUser(function (adminData, done) {
    return done(null, adminData.id)
});

passport.deserializeUser(async function (id, done) {
    let hotell = await admin.findById(id);
    if (hotell) {
        return done(null, hotell)
    }
    else {
        return done(null, false)
    }
})



passport.dataShowinPages = (req, res, next) => {
    // console.log(req.user)
    if (req.isAuthenticated()) {
        res.locals.admin = req.user;
    }
    next();
}


module.exports = passport;