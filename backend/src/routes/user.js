const router = require('express').Router();
const userController=require('../controllers/user');
const auth = require('../middleware/auth');

router.post('/login', userController.login);

router.patch('/updateuser/:id', userController.updateUser);

router.patch("/changepassword/:id", userController.changePassword);

router.post("/forgetpassword", userController.forgetPassword);

router.patch("/resetpassword/:id", userController.resetPassword);

router.post('/register', userController.createUser);

router.post('/logout',auth.validateToken,userController.logout);

router.patch('/registercourse/:id',userController.registerCourse);

router.patch('/opensource/:id',userController.openSource);

module.exports=router;