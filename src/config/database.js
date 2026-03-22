const mongoose=require("mongoose");
const connectDB=async ()=>{
    await mongoose.connect("mongodb+srv://SansarKakkar_db_user:TCsaPaTmM3NyP3Zr@personaldatabase.ytvvoos.mongodb.net/devtinder");
};
module.exports=connectDB;