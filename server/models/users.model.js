import mongoose from "mongoose";
const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    username:
    {
type:String,
lowercase:true,
required:true,
unique:true,
trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
password:{
type:String,
required:true,
 minlength:8
},
bio:{
    type:String,
    default:"",
    trim:true
}
}, {timestamps:true})
  export const User= mongoose.model("User",userSchema)