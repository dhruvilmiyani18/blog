const mongoose = require('mongoose');

const multer = require('multer');
const AvatarPath = '../uploads/bolg';
const path = require('path');

const bolgschema = mongoose.Schema({
    title :{
        required : true,
        type : String
    },
    description :{
        required : true,
        type :String
    },
    avatar :{
        required : true,
        type :String
    },
    date :{
        required :true,
        type :String
    },
    username :{
        required : true,
        type :String
    }
})


const blogImages = multer.diskStorage({
    destination :(req,file,cb)=>{
        cb(null,path.join(__dirname,AvatarPath));
    },
    filename :(req,file,cb)=>{
        cb(null,file.fieldname+'-'+Date.now())
        
    }
})

bolgschema.statics.blogUploadsImage = multer({storage :blogImages}).single('avatar');
bolgschema.statics.blogImagePath = AvatarPath;

 
const blog = mongoose.model('blog', bolgschema);

module.exports = blog;