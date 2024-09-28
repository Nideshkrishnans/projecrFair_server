//import express
const express = require('express')

//import userController
const userController= require('./controllers/userController')

//import projectController
const projectController=require('./controllers/projectController')


//import jwt middleware
const jwt = require('./middleware/jwtMiddleware')
const multer = require('./middleware/multerMiddleware')

//create object for router class
const router = new express.Router()

//register
router.post('/register',userController.registerController)

//login
router.post('/login',userController.loginController)

//addProject
router.post('/add-project', jwt,multer.single("projectImg"),projectController.addProjectController)

//get home projects
router.get('/home-project', projectController.getHomeProjectController)

//get all projects
router.get('/all-project', projectController.getAllProjectController)

//get user project
router.get('/user-project',jwt,projectController.getUserProjectController)

//delete userproject
router.delete('/remove-userproject/:id',projectController.deleteUserProjectController)

//edit user project
router.put('/edit-project/:id',jwt,multer.single('projectImg'),projectController.editUserProjectController)

//update profile
router.put('/update-profile',jwt,multer.single('profile'),userController.updateProfileController)


module.exports = router