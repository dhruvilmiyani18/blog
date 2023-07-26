const mongoose =require('mongoose');


const multer =require('multer');
const path =require('path')

const AvtarPAth = './uploads';


const adminSchema =mongoose.Schema({
    username : {
        type : String,
        required : true,
    },
    email :{
        type : String,
        required : true,
    },
    password :{
        type : String,
        required : true,
    },
    avatar :{
        type :String,
        required : true
    },
    isActive: {
        type: Boolean,
        required : true
    }
})

const images = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,path.join(__dirname,'..',AvtarPAth));
    },
    filename :(req,file,cb)=>{
        cb(null,file.fieldname+'-'+Date.now());
    }
});

adminSchema.statics.uploadImg =multer({storage : images}).single('avatar');
adminSchema.statics.imagefile =AvtarPAth;


const admin =mongoose.model('admin',adminSchema);

module.exports= admin;
