const { response } = require('express');
const admin = require('../model/admin');
const { count, findById, findOne } = require('../model/slider');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const comment = require('../model/comment');
// const slider =require('../model/slider');


module.exports.dashboard = (req, res) => {
    return res.render('home')

}
module.exports.formData = async (req, res) => {
    // console.log(req.file);

    var img = '';

    if (req.file) {
        img = admin.imagefile + '/' + req.file.filename;
        req.body.avatar = img;
        req.body.isActive = true;
    }

    admin.create(req.body).then(Response => {
        req.flash('success', 'login successfully')
        return res.redirect('/form')
    }).catch(err => {
        console.log(err);
        return res.redirect('/form')
    })
}
module.exports.table = async (req, res) => {

    var search = '';
    if (req.query.search) {
        search = req.query.search;
    }
    var page = 1;
    if (req.query.page) {
        page = req.query.page
    }
    let limit = 2;


    let data = await admin.find({
        $or: [
            { username: { $regex: search, $options: 'i' } }
        ]
    })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec()

    let count = await admin.find({
        $or: [
            { username: { $regex: search, $options: 'i' } }
        ]
    })
        .countDocuments()

    if (data) {
        return res.render('table', {
            record: data,
            totalPage: Math.ceil(count / limit),
            searchData: search
        })
    }
}


module.exports.login = (req, res) => {
    return res.render('login');
}

module.exports.loginData = (req, res) => {
    // console.log(req.body);
    return res.redirect('/dashboard');
}
module.exports.logout = (req, res) => {
    req.logout(err => {
        if (err) {
            next();
        }
        return res.redirect('/');
    })
}
module.exports.chengepassword = (req, res) => {
    return res.render('chengePassword')
}
module.exports.viewComment=async (req,res)=>{
   
    let CommentData = await comment.find({}).populate('blogId').exec();
    // console.log(CommentData);
    if(CommentData){
        return res.render('view_comment',{'CommentData':CommentData});
    }
}

module.exports.chengepassInsert = async (req, res) => {
    let data = await req.user;
    console.log(req.user)
    if (data.password === req.body.currentpass) {
        if (req.body.currentpass !== req.body.newpassword) {
            if (req.body.newpassword == req.body.confirnpassword) {
                let record = await admin.findById(data._id);
                console.log(record);
                if (record) {

                    let newPasword = await admin.findByIdAndUpdate(record.id, {
                        password: req.body.newpassword,
                    });
                    console.log('password change');
                    return res.redirect('/logout');
                }
                else {
                    console.log('1');
                    return res.redirect('/changepassword')

                }

            }
            else {
                console.log('2');
                return res.redirect('/changepassword')
            }

        }
        else {
            console.log('3');
            return res.redirect('/changepassword')
        }
    }
    else {
        console.log('4');
        return res.redirect('/changepassword')
    }

}

// forgot password

module.exports.checkMail = async (req, res) => {
    let mail = await admin.findOne({ email: req.body.email });
    // console.log(mail);
    if (mail) {
        var transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "9d22ea740bc9f8",
                pass: "2bcf9c210a54f4"
            }
        });
        var otp = Math.ceil(Math.random() * 100000);
        res.cookie('otp', otp);
        // console.log(otp);
        res.cookie('mail', req.body.email);
        let info = await transporter.sendMail({
            from: "dhruvilmiyani300@gmail.com", // sender address
            to: req.body.email, // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world", // plain text body
            html: `<b>Otp :${otp}</b>`, // html body
        });
        return res.redirect('/otp')

    } else {
        req.flash('error', "Email Not Found")
        return res.redirect('back')
    }
}

module.exports.checkOtp = async (req, res) => {
    // console.log(req.body.otp);
    // console.log(req.cookies.otp)
    if (req.body.otp === req.cookies.otp) {
        return res.redirect('/resetPassword')
    }
    else {
        return res.redirect('back')
    }
}
module.exports.resetPassword = async (req, res) => {
    // console.log(req.body);

    if (req.body.npass == req.body.cpass) {
        let email = await admin.findOne({ email: req.cookies.mail });
        if (email) {
            let data = await admin.findById(email.id);
            if (data) {
                let hashPassword = await bcrypt.hash(req.body.npass, 10);
                let upPass = await admin.findByIdAndUpdate(data.id, { password: hashPassword });
                if (upPass) {
                    return res.redirect('/');
                } else {
                    return res.redirect('back');
                }
            } else {
                return res.redirect('back');
            }
        } else {
            return res.redirect('back');
        }
    } else {
        return res.redirect('back')
    }
}