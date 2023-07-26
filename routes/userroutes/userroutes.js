
const { Router } = require('express');
const express = require('express');

const routes =express.Router();

const blogcontroller = require('../../controller/blogController');
const usercontroller = require('../../controller/usercontroller/usercontroller');

const comment =require('../../model/comment');



routes.get('/',usercontroller.getuser);

routes.post('/commentInsert',comment.commentUploadsImg,usercontroller.commentInsert);

routes.get('/blogSinglePage/:id',blogcontroller.blog_singlepage);




module.exports=routes;