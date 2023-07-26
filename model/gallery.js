const mongoose = require('mongoose');
const multer = require('multer');

const uploads = '../uploads/gallery';

const path =require('path');

const gallerySchema =mongoose.Schema({
    title :{
        type :String,
        required : true
    },
    description :{
        type :String,
        required :true
    },
    galleryImg :{
        type :String,
        required :true
    }
});

const galleryimages = multer.diskStorage({
    destination :(req,file,cb)=>{
        cb(null,path.join(__dirname,uploads));
    },
    filename :(req,file,cb)=>{
        cb(null,file.fieldname+'-'+ Date.now());
    }
    
});

gallerySchema.statics.uploadGalleryImg = multer({storage : galleryimages}).single('galleryImg');
gallerySchema.statics.imgFile = uploads;


const gallery = mongoose.model('gallery',gallerySchema)

module.exports =gallery;