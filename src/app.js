const express=require('express');
const app=express();
// order matters in this
// this is the format for how to display on Server
// this will display same data on get and post
// app.use("/test",(req ,res)=>{
//     res.send('easy peasy')
// });
// app.use("/user",(req ,res)=>{
//     res.send('myself sansar kakkar')
// });
// we want to sep get and post because it  post user should give data
// regex works in this
// app.get('/user',(req,res)=>{
//     res.send({firstname:'sansar',lastname:'kakkar'});
// })
// app.post('/user',(req,res)=>{
//     res.send('data successfully uploded');
// })
// app.delete('/user',(req,res)=>{
//     res.send('deleted success');
// })
app.get('/user/:userid',(req,res)=>{
    console.log(req.params);
    res.send({firstname:'sansar',lastname:'kakkar'});
})
// in this ? make r optional
app.listen(3000,()=>{
    console.log('port 3000');
});