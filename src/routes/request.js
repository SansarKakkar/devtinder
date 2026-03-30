const express=require("express");
const { userAuth } = require("../middleware/auth");
const requestRouter=express.Router();
const User=require("../models/user");
const ConnectionRequest=require("../models/connectionRequest");

requestRouter.post("/Request/send/:status/:toUserId",userAuth,async(req,res)=>{
    try{
        const fromUserId=req.user._id;
        const toUserId=req.params.toUserId;
        const status=req.params.status;
        const allowedStatus=['ignored',"interested"];
 
        if(!allowedStatus.includes(status)){
            return res.status(400).json({message:"invalid status type:"+status});
        }
        const toUser=await User.findById(toUserId);
        if(!toUser){
            return res.status(400).send({message:"user not found"})
        }

        const existingConnectionRequest= await ConnectionRequest.findOne({
            $or:[
                {fromUserId,toUserId},
                {fromUserId:toUserId,toUserId:fromUserId},
            ],
        });
        if(existingConnectionRequest){
            return res.status(400).send({message: "connection request already exist"});
        }
        const connectionRequest=new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        })
        const data=await connectionRequest.save();
        res.json({
            message:"connection request sent",
            data,
        });
    }
    catch(err){
            res.status(400).send(err.message);
    }
});
requestRouter.post("/Request/review/:status/:requestId",userAuth,async(req,res)=>{
    try{
    const requestId=req.params.requestId;
    const loggedInUser=req.user;
    const status=req.params.status;

    const allowedStatus=["accepted","rejected"];
    if(!allowedStatus.includes(status)){
        return res.status(400).json({message:"status is not correct"});
    }
    const connectionRequest=await ConnectionRequest.findOne({
        _id: requestId,
        toUserId:loggedInUser._id,
        status:"interested",
    });
    if(!connectionRequest){
        return res.status(404).json({message:"connection request not found"});
    }
    connectionRequest.status=status;
    await connectionRequest.save();
    res.json({message:"connection request"+status,data:connectionRequest});
    }
    catch(err){
        res.status(400).send("ERROR :"+err.message);
    }
});

module.exports={requestRouter};