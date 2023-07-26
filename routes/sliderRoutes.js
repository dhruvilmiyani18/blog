const express =require('express');

const routes = express.Router();

const sliderController = require('../controller/sliderController');   
const slider = require('../model/slider');

routes.get('/userslider',sliderController.getuserslider);

routes.post('/sliderform', slider.sliderUploadsImage,sliderController.sliderFormInsetData);

module.exports = routes;
