const { model } = require('mongoose');
const validator=require('validator');
const validateSignUpData=(req)=>{
    const {firstName,lastName,emailId,password}=req.body;
    if(!firstName||!lastName){
        throw new Error("name not valid");
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("email not valid");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("not valid password");
    }};
const validateEditData=(req)=>{
const allowedEditFields=["firstName","lastName","photoUrl","age","about","skills","gender"];
const isEditAllowed=Object.keys(req.body).every((feild)=>allowedEditFields.includes(feild));
return isEditAllowed;
}
    module.exports={validateSignUpData,validateEditData,};