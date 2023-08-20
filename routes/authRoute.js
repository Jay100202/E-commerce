import express from "express";
import {registerController,loginController,testController, forgetpasswordController} from '../controllers/authController.js'
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

//router object = to app seperate file me routing karege to apko router ka object lagta he
const router = express.Router();

//routing
//REGISTER || POST METHOD
router.post("/register",registerController);

//LOGIN || POST 
router.post("/login",loginController);

//Forgot Password || POST
router.post("/forgot-password", forgetpasswordController);

//test routes
router.get("/test",requireSignIn,isAdmin,testController);

//protected route auth
router.get("/user-auth", requireSignIn, (req,res) =>{
    res.status(200).send({ok:true});
});

export default router