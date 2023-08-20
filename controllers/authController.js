import { comaprePassword, hashPassword } from "../helpers/authHelper.js";
import userModels from "../models/userModels.js";
import JWT from 'jsonwebtoken';

export const registerController = async(req,res)=>{
    try {
        // idhar ham userModel dekhege
        // Sabse pehle ham user ko register karenge matlab sabse pehle user ki detail hamko get karna he

        const {name,email,password,phone,address,answer} = req.body
        //validation perform karenge aab means ke data dala he vo sahi dala he na 
        if(!name){
            return res.send({message:"Name is Required"})
        }

        if(!email){
            return res.send({message:"email is Required"})
        }

        if(!password){
            return res.send({message:"Password is Required"})
        }

        if(!phone){
            return res.send({message:"Phone no is Required"})
        }

        if(!address){
            return res.send({message:"Address is Required"})
        }

        if(!answer) {
            return res.send({message:"Answer is Required"})
        }
        
        //Check user
        // findOne kya he ek method he isme ek ham yaha pr request find kar rahe he
        const existingUser = await userModels.findOne({email})

        // Existing user aab ham check karenge existing user ko kyuki same email se hamko multiple account nahi banane
        if(existingUser){
            return res.status(200).send({
                success:false,
                messgae:"Already Register please login"
            })
        }
        
        // register user
        // aab hamare pass jo password arahe he usko ham hash banayge
        const hashedPassword = await hashPassword(password);

        // save
        const user = await new userModels({name,email,phone,address,password:hashedPassword,answer}).save()

        res.status(201).send({
            success:true,
            messgae:"User Register Successfully",
            user
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            messgae:'Error in Registration',
            error
        })
    }
};

// POST login
export const loginController = async(req,res) =>{
    try {
        // sabse pehle ham check kare lege hamko kya kya mil raha he email or password milta he
        const {email,password} = req.body;
        //validation

        if(!email || !password){
            return res.status(404).send({
                success:false,
                message:"Invalid email or password"
            })
        }
        
        // check user
        const user = await userModels.findOne({email});
        if(!user){
            return res.status(404).send({
                success:false,
                message:"Email is not registered"
            })
        }

        // agar hamare pass successfully hamko email miljata he tab kya karege ham password ko bhi compare karke dekhenge
        // hamare paas plain password he or database jo password he vo hash value he to usko decrypt bhi karna padega
        const match = await comaprePassword(password,user.password);

        if(!match){
            return res.status(200).send({
                success:false,
                messgae:"Invalid password"
            })
        }

        //token
        const token = await JWT.sign({_id:user._id},process.env.JWT_SECRET,
            {expiresIn:"7d",
        });

        res.status(200).send({
            success:true,
            message:"login successfully",
            user:{
                name:user.name,
                email:user.email,
                phone:user.phone,
                address:user.address
            },
            token,
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            messgae:"Error in login",
            error
        })
    }
};

// for forgetpasswordController
export const forgetpasswordController = async(req,res) => {
    try {
        const {email,answer,newPassword} = req.body;
        if(!email){
            res.status(400).send({message:'Email is required'});
        }
        if(!answer){
            res.status(400).send({message:'answer is required'});
        }
        if(!newPassword){
            res.status(400).send({message:'New Password is required'});
        }

        // check yaha pe ham email or answer ko check karege agar vo dono sahi he tab hi aam 
        // password ko change karege 
        const user = await userModels.findOne({email,answer});
        // validation
        
        if(!user){
            return res.status(404).send({
                success:false,
                message:"Wrong Email or Answer"
            })
        }
        // now agar ye true  hota he to ham kya karege to hamare paas jo password he vo hash he to yaha pe 
        // ham usko use karedege or password ko hash kardege
        const hashed = await hashPassword(newPassword)
        await userModels.findByIdAndUpdate(user._id,{password:hashed})
        res.status(200).send({
            success:true,
            message:"Password Reset Successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            messgae:"Something went wrong",
            error
        })
    }
}

//test controller
export const testController = (req,res) =>{
  try {
    res.send("Protected route");
  } catch (error) {
    console.log(error);
    res.send({error})
  }
}
