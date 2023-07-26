const mongoose =require('mongoose');

const uploads = '../uploads/slider';
const path =require('path')
const multer = require('multer');

const sliderSchema = mongoose.Schema({
    title : {
        type :String,
        required : true
    },
    description : {
        type : String,
        required :true
    },
    sliderImg : {
        type :String,
        required : true
    }
  
})

const sliderimg = multer.diskStorage({
    destination :(req,file,cb)=>{
        cb(null,path.join(__dirname,uploads));
    },
  filename : (req,file,cb)=>{
    cb(null,file.fieldname+'-'+Date.now());
  }
});

sliderSchema.statics.sliderUploadsImage =multer({storage : sliderimg}).single('sliderImg');
sliderSchema.statics.sliderImagePath = uploads;

const slider =mongoose.model('slider', sliderSchema);

module.exports =slider;