const express=require("express");
const profileRouter=express.Router();
const User=require("../models/user");
const {userAuth}=require("../middleware/auth");
profileRouter.get("/profile",userAuth,async (req,res)=>{
    try{
    res.send(req.user);
    }
    catch(err){
        res.status(400).send(err.message)
    }
    });
    module.exports={profileRouter,}