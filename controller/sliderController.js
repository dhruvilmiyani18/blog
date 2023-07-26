const slider = require('../model/slider');

module.exports.getuserslider = (req, res) => {
    return res.render('slider');
}

module.exports.sliderFormInsetData = async (req, res) => {
    var imgPath = '';
    
    if(req.file){
        imgPath = slider.sliderImagePath+ '/'+ req.file.filename;
        // console.log(imgPath)
        req.body.sliderImg = imgPath;
    }

    var data = await slider(req.body);
    // console.log(data)
    data.save();
    if (data) {
        return res.redirect('back');
    }
    else {
        console.log(err)
        return false;
    }
}