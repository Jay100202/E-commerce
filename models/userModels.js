import mongoose from "mongoose";

//Schema create karege
const userSchema = new mongoose.Schema({
    // idhar ham object create karege
    name:{
        type:String,
        required:true,
        trim:true // trim ka meaning he ki jitne bhi white spaces he vo remove ho jaygi    
    },

    email:{
        type:String,
        required:true,
        unique:true
    },

    password:{
        type:String,
        required:true
    },

    phone:{
        type:String,
        required:true
    },

    address:{
        type:String,
        required:true
    },
    // this for forget password
    answer:{
        type:String,
        required:true
    },

    role:{
        type:Number,
        default:0  // 0 matlab false and 1 matlab true
    }
},{timestamps:true}  // isase ye hoga ki jab bhi new user login karega uska time ajyaga ke usne kab login kiya
);

export default mongoose.model('users',userSchema); // users isliye likha he kyuki mongodb compass me hamne user ka collection banaya he 