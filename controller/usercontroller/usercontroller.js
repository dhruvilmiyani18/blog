
const slider =require('../../model/slider');
const gallery = require('../../model/gallery');
const blog = require('../../model/blog');
const comment = require('../../model/comment');

module.exports.getuser= async (req,res)=>{
    let sliderData = await slider.find({});
    let gallerydata = await gallery.find({});
    let blogdata = await blog.find({});
    // console.log(gallerydata)

    return res.render('user/userhome',{
        sliderRecord :sliderData,
        galleryrecord : gallerydata,
        blogrecord :blogdata
    });
}



 module.exports.commentInsert = async (req, res) => {
    
    var imagePath = '';

    if (req.file) {
        imagePath = comment.commentImgPath + '/' + req.file.filename;
    }
    req.body.image = imagePath;

    let data = await comment.create(req.body);
    // console.log(data);


    if (data) {
        return res.redirect('back')
    } else {
        console.log(err);
        return res.redirect('back')
    }


};



