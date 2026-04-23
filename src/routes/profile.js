const express=require("express");
const profileRouter=express.Router();
const User=require("../models/user");
const {userAuth}=require("../middleware/auth");
const {validateSignUpData,validateEditData}=require("../utils/validations");
profileRouter.get("/profile",userAuth,async (req,res)=>{
    try{
    res.send(req.user);
    }
    catch(err){
        res.status(401).send(err.message)
    }
    });
profileRouter.patch("/profile/edit",userAuth,async(req,res)=>{
        const user=req.user;
        try{
            if(!validateEditData(req)){
                throw new Error("invalid request")
            };
        Object.keys(req.body).forEach((key)=>(user[key]=req.body[key]));
        await user.save();
        res.send("profile updated succesfully");
        }
        catch(err){
            throw new Error("Error:"+err.message);
        }
    })

    module.exports={profileRouter,}