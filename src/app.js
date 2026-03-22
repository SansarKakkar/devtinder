const express=require('express');
const app=express();
const connectDB=require("./config/database");
const cookieParser=require("cookie-parser");
const { ReturnDocument } = require('mongodb');
app.use(express.json())
app.use(cookieParser());
const {authRouter}=require("./routes/auth");
const {profileRouter}=require("./routes/profile");
const {requestRouter}=require("./routes/request");
app.use('/',authRouter);
app.use('/',profileRouter);
app.use('/',requestRouter);

connectDB().then(()=>{
    console.log("db connected");
    app.listen(777,()=>{
    console.log("sever 777");
});
})
.catch((err)=>{
    console.log("db error");
});


























// const express=require('express');
// const app=express();
// const {admin}=require('./middleware/auth')
// app.get('/admin',admin,(req,res)=>{
//     res.send('user valid');
// })
// app.listen(3000,()=>{
//     console.log('port 3000');
// });

// app.get("/feed",async (req,res)=>{
//     const name=req.body.firstName;
//     try{
//         const user=await User.find({firstName:name});
//         res.send(user)
//     }
//     catch(err){
//         res.status(400).send("404");
//     }

// });
// app.get("/feed",async (req,res)=>{
//     try{
//         const user=await User.find({});
//         res.send(user)
//     }
//     catch(err){
//         res.status(400).send("404");
//     }

// });
// app.delete("/feed",async (req,res)=>{
//     const id=req.body.userId;
//     try{
//         const user=await User.findByIdAndDelete(id);
//         res.send("user deleted succesfully");
//     }
//     catch(err){
//         res.status(400).send("404");
//     }

// });
// update data of the user
// app.patch("/user",async(req,res)=>{
//     const id=req.body.userId;
//     try{
//         const user=await User.findByIdAndUpdate(id,{firstName:"sansar kakkar"});
//         res.send("user updated succesfully");
//     }
//     catch(err){
//         res.status(400).send("404");
//     }
// })
// updateing data at once

// app.patch("/user",async(req,res)=>{
//     const id=req.body.userId;
//     const data=req.body;

//     try{
//         const allowed=['password','gender','firstName','lastName']
//         const isAllowed=Object.keys(data).every((k)=>{
//             return allowed.includes(k)
//         });
//         if(!isAllowed){
//             throw new Error("update not allowed");
//         }
//         const user=await User.findByIdAndUpdate(id,data,{returnDocument:"after",runValidators:true});
//         console.log(user);
//         res.send("user updated succesfully");
//     }
//     catch(err){
//         res.status(400).send(err.message);
//     }
// })