import { User } from "../models/users.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
export const registerUser = async (req, res) => {
  try {
    const { name, email, password ,username ,bio} = req.body
    if (!name || !email || !password || !username)  {
      return res.status(400).json({
        message: "Please fill all fields"
      })
    }
    const existUser = await User.findOne({ email })
    if (existUser) {
      return res.status(400).json({
        message: "User already exists"
      })
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await User.create({
      name,
      username,
      email,
      password: hashedPassword
    })
    const token = jwt.sign(
      { id: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    )
    return res.status(201).json({
      message: "User created successfully",
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        username:newUser.username,
        bio:newUser.bio
      }
    })
  } catch (error) {
    console.log("Registration Failed", error.message)
    return res.status(500).json({
      message: "Internal server error"
    })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({
        message: "All fields required"
      })
    }
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password"
      })
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    )
    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid email or password"
      })
    }
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    )
    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    })
  } catch (error) {
    console.log("Login failed", error.message)
    return res.status(500).json({
      message: "Internal server error"
    })
  }
} 

 export const me= async( req,res)=>{
 try {
  const user= await User.findById(req.user.id).select("-password")
  if(!user){
    return res.status(404).json({
      message:"User not found"
    })
  }
  return res.status(200).json({
    user
  })
 } catch (error) {
  console.log("Get user failed",error.message)
  return res.status(500).json({
      message: "Internal server error"
    })
 }
 }