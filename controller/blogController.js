const { response } = require('express');
const blog = require('../model/blog');
const comment = require('../model/comment');


module.exports.GetBlogForm = async (req, res) => {
    return res.render('blogform');
}

module.exports.bolgFormInsertData = async (req, res) => {
    //     console.log(req.body);

    //    console.log(date);
    //    console.log(req.user.username);
    //    console.log(req.file);

    var imgPath = '';
    if (req.file) {
        imgPath = blog.blogImagePath + '/' + req.file.filename;
        //   console.log(imgPath)
        var date = new Date().toJSON().slice(0, 10).split('-').reverse().join('/')
        req.body.avatar = imgPath;
        req.body.date = date;
        req.body.username = req.user.username;
    }

    let data = await blog(req.body);
    data.save();
    if (data) {
        return res.redirect('back');
    }
    else {
        console.log(err);
        return false;
    }
}
module.exports.blog_singlepage = async (req, res) => {

     
    let data = await blog.findById(req.params.id);
    // console.log(data);

    let commentCount = await comment.find({ blogId: req.params.id }).countDocuments();
    // console.log(commentCount);
    let commentData = await comment.find({ blogId: req.params.id });
    // console.log(commentData);

    let lastRecord = await blog.find({}).sort({ _id: -1 }).limit(2);
    // console.log(lastRecord);




    if (data) {
        return res.render('user/blog-singlepage', { ab: data, blogId: req.params.id, 'commentCount': commentCount, 'commentData': commentData, 'lastRecord': lastRecord });
    }

}