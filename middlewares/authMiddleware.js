import JWT from "jsonwebtoken";
import userModels from "../models/userModels.js";

//aab iski madad se ham yaha pr protect karege user ko
// Protected routes token based
export const requireSignIn = async (req,res,next) =>{
  // next matlab kya he ? middleware ka simple matlab he ki req jab bhi ham get karege 
  // so uske baad me jo he next validate hoga uske baad me response send hoga agar next nai likhege to hamara execution stop hojayga
    try {
        const decode =  JWT.verify(req.headers.authorization,
            process.env.JWT_SECRET
        ); // yaha pe ham token pass karege or hamara token headers me rehta he
        req.user = decode;

        next();
    } catch (error) {
        console.log(error);
    }
};

// ye middleware ham admin ke liye check kar rahe he 
// agar hamare database me role = 0 matlab vo ek normal user he agar role  = 1 he to vo ek admin he
//admin excess

export const isAdmin = async(req,res,next) =>{
    try {
        // yaha pe hame check karna he ki user admin he ke nai he 
        const user = await userModels.findById(req.user._id) // ye konsa user he hamne hamare authcontroller me user ko paas kara rahe he to uski madad se ham id ko get kar dege 
        if(user.role !== 1){
            return res.status(401).send({
                success:false,
                message:"UnAuthorized Access"
            })
        }
        else{
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(401).send({
            success:false,
            error,
            message:"Error in admin middleware",
        });
    }
}