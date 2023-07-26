const mongoose = require('mongoose');

const multer = require('multer');
const path = require('path');
const AvatarPath = '/uploads/bolg/comment';

const commentSchema = mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    blogId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "blog"
    },
    email: {
        required: true,
        type: String
    },
    comment: {
        required: true,
        type: String
    },
    image: {
        type: String,
        required: true,
    },
    isActive: {
        default: true,
        type: Boolean,

    }

});

const commentImg = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..',AvatarPath));
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now());
    }
});

commentSchema.statics.commentUploadsImg = multer({ storage: commentImg }).single('image');
commentSchema.statics.commentImgPath = AvatarPath;

const comment = mongoose.model('Comment', commentSchema); 
module.exports = comment;