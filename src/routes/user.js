const express= require("express");
const { model, set } = require("mongoose");
const { userAuth } = require("../middleware/auth");
const ConnectionRequest=require("../models/connectionRequest");
const userRouter=express.Router();
const User=require("../models/user");
userRouter.get("/user/requests/received",userAuth,async(req,res)=>{
try{
    const loggedInUser=req.user;
    const connectionRequest=await ConnectionRequest.find({
        toUserId:loggedInUser._id,
        status:"interested"
    }).populate("fromUserId",["firstName","lastName","photoUrl","age","gender","about"]);
res.json({
    message:"data fetched successfully",
    data: connectionRequest
});
}
catch(err){
    res.status(400).send("Error:"+err.message);
}
});
userRouter.get("/user/connections",userAuth,async(req,res)=>{
    try{
        const loggedInUser=req.user;
        const connectionRequest= await ConnectionRequest.find({
            $or:[
                {toUserId:loggedInUser._id,status:"accepted"},
                {fromUserId:loggedInUser._id,status:"accepted"}
            ]
        }).populate("fromUserId",["firstName","lastName","photoUrl","age","gender","about"])
        .populate("toUserId",["firstName","lastName","photoUrl","age","gender","about"]);
        const data=connectionRequest.map((row)=>{
            if(row.fromUserId._id.toString()===loggedInUser._id.toString()){
                return row.toUserId;
            }
            return row.fromUserId});
        res.json({data:connectionRequest});
    }
    catch(err){
        res.status(400).send({message:err.message});
    }
});
userRouter.get("/feed",userAuth,async(req,res)=>{
    try{
        const page=parseInt(req.query.page)||1;
        let limit=parseInt(req.query.limit)||10;
        limit=limit>50 ?50:limit;
        const skip=(page-1)*limit;
        const loggedInUser=req.user;
        const connectionRequest=await ConnectionRequest.find({
            $or:[
                {fromUserId:loggedInUser._id},
                {toUserId:loggedInUser._id}
            ]
        }).select("fromUserId toUserId");
        const hideUserFromFeed= new Set();
        connectionRequest.forEach(req=>{
            hideUserFromFeed.add(req.fromUserId.toString());
            hideUserFromFeed.add(req.toUserId.toString());
        })
        const users=await User.find({
          $and:[{_id:{$nin:Array.from(hideUserFromFeed)}},
            {_id:{$ne:loggedInUser._id}},
          ],
          }).select(["firstName","lastName","photoUrl","age","gender","about"])
          .skip(skip).limit(limit);
        res.send(users);
    }
    catch(err)
    {
        res.status(400).send(err.message);
    }
    
})
module.exports=userRouter;