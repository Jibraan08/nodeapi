const express = require("express");
const router = express.Router();

const authController = require('../controllers/auth')
const {login,signup,fetchdata,deleteDirectory,updateUser,postImage,getImage,postImages} = require('../controllers/auth')


const middle = require('../middlewares/authMiddleware')
router.post('/login', login);
router.post('/signup', signup);
router.get('/fetchdata', fetchdata);
router.patch('/updatedata', updateUser);
router.delete('/delete',deleteDirectory);
router.get('/getimage',getImage);
router.post('/postimage',postImage);
router.post('/postimages', postImages);


module.exports = router