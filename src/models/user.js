const mongoose=require("mongoose");
const validator=require("validator");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
const userSchema=mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String
    },
    emailId:{
        type:String,
        required:true,
        lower:true,
        trim:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("invalid email");
            }
        }
    },
    password:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("invalid password");
            }
        }
    },
    age:{
        type: Number,
        min:18
    },
    gender:{
        type:String,
        validate(value){
            if(!['male','female','other'].includes(value)){
                throw new Error("gender not valid");  
            }
        },
    },
    about:{
        type:String,
        default:"this is default"
    },
    photUrl:{
        type:String,
    },
    skills:{
        type:[String],
    }


},{
    timestamps:true,
});
userSchema.methods.getJWT=async function(){
    const user=this;
const token=await jwt.sign({_id:user.id},"DevTinder",{
                expiresIn:"1d",
            });
            return token;
}
userSchema.methods.validPassword=async function(password){
    const user=this;
    const isPasswordValid=await bcrypt.compare(password,user.password)
    return isPasswordValid;
}
const userModel=mongoose.model("user",userSchema);
module.exports=userModel;