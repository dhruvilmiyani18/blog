const express =require('express');

const routes = express.Router();

const blogcontroller = require('../controller/blogController');  

const blog = require('../model/blog');


routes.get('/GetBlogForm',blogcontroller.GetBlogForm);
routes.post('/blogFormInsertData',blog.blogUploadsImage,blogcontroller.bolgFormInsertData);


module.exports = routes;