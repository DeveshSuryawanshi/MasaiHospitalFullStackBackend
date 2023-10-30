const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {UserModel} = require("../Models/user.model");
const {checkPassword} = require("../Validators/passwordChecker");

const userRouter = express.Router();


userRouter.get("/", async(req, res) =>{
    try {
        const users = await UserModel.find();
        res.status(200).json({"users" : users});
    } catch (error) {
        res.status(400).json({"error" : error.message});
    }
})

userRouter.post("/signup", async(req, res) =>{
    try {
        const {email, password, confirmPassword} = req.body;
        const existingUser = await UserModel.find({email});
        if(existingUser.length){
            return res.status(400).json({"error" : "Registration failed User already exists"});
        }
        if(checkPassword(password)){
            if(password === confirmPassword){
                bcrypt.hash(password, 5, async(err, hash) =>{
                    const user = new UserModel({email, password : hash, confirmPassword : hash});
                    await user.save();
                    return res.status(200).json({"msg" : "The new User has been registered", "registeredUser" : user});
                })
            }else{
                return res.status(400).json({"error" : "Password and Confirm Password are not matching!!!"});
            }
        }else{
            res.status(400).json({"error" : "Registration failed ! Password should contain atlese one uppercase, one number and one unique character"});
        }
    } catch (error) {
        res.status(400).json({"error" : error.message});
    }
})

userRouter.post("/login", async(req, res) =>{
    try {
        const {email, password} = req.body;
        const existingUser = await UserModel.findOne({email});
        if(existingUser){
            bcrypt.compare(password, existingUser.password, (err, result) => {
                if(result){
                    const token = jwt.sign({userID : existingUser._id}, "masai", {
                        expiresIn : 420
                    })
                    return res.status(200).json({"msg" : "Login Successful", "token" : token});
                }else{
                    res.status(400).json({"msg" : "Invalid Credentials! Wrong password provided"});
                }
            })
        }else{
            res.status(400).json({"error" : "Invalid Credentials! Wrong email provided"});
        }
    } catch (error) {
        res.status(400).json({"error" : error.message});
    }
})

module.exports = {
    userRouter
}