const gallery =require('../model/gallery');

module.exports.showGalleryForm =(req,res)=>{
    return res.render('galleryform');
}

module.exports.galleryFormInsret = async (req,res)=>{

    var imgPath = '';

    if(req.file){
        imgPath = gallery.imgFile+'/'+req.file.filename;
        req.body.galleryImg = imgPath;
    }

    let data = await gallery(req.body);
    data.save();
    if(data){
        return res.redirect('back');
    }
    else{
        console.log(err);
        return false;
    }
}