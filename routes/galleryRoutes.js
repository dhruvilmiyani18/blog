const express =require('express');

const routes = express.Router();

const galleryController =require('../controller/galleryController'); 
const gallery =require('../model/gallery');

routes.get('/galleryform', galleryController.showGalleryForm);
routes.post('/galleryFormInsret',gallery.uploadGalleryImg ,galleryController.galleryFormInsret);



module.exports = routes;