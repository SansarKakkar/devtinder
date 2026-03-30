const mongoose =require('mongoose');

const connectionRequestSchema= new mongoose.Schema({
    fromUserId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    toUserId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    status:{
        type:String,
        required:true,
        enum:{
            values:["ignored","interested","accepted","rejected"],
            message:'{value} is not supported'
        }
    }

},
{
    timestamps:true,
});
connectionRequestSchema.pre("save", async function(){
    const connectionRequest=this;
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("cannot sent request to yourself");
    }
})
connectionRequestSchema.index({fromUserId:1,toUserId:1});
const ConnectionRequestModel=new mongoose.model("ConnectionRequest",connectionRequestSchema);
module.exports=ConnectionRequestModel;