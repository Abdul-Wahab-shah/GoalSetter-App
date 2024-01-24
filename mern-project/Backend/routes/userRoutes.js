const express=require('express')
const router=express.Router() 
const {
    registerUser,
    loginUser,
    getMe,
}=require('../controllers/userController.js')  



router.post('/',registerUser)
router.post('/login',loginUser)
router.get('/getme',getMe)

module.exports=router