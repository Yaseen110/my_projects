const express=require("express")
const User=require("../models/User")
const router=express.Router()
const bcrypt=require("bcryptjs")
const {body,validationResult} = require("express-validator")
const jwt = require("jsonwebtoken")
let jwtsecret="mynameismdyaseenandiamagoodboy"
var fetchuser=require("../middleware/fetchuser")
router.post('/signup',
[
    body('name','enter a valid name').isLength({min:3}),
    body('email','enter a valid email').isEmail(),
    body('password','enter a valid password').isLength({min:5})
],
async (req,res)=>{
    let success=false
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({success,errors:errors.array()})
    }
    try{
        let user=await User.findOne({email:req.body.email})
        if(user){
            success=false
            return res.status(400).json({success,error:"sorry a person has already registered with this email"})
        }
        const salt =await bcrypt.genSalt(10)
        const secpass=await bcrypt.hash(req.body.password,salt)
        user= await User.create({
            name:req.body.name,
            password:secpass,
            email:req.body.email
        })
        const data={
            user:{
                id:user.id
            }
        }
        const jwtdata = jwt.sign(data,jwtsecret)
        success=true
        res.json({success,authtoken:jwtdata})
    }
    catch(error){
        console.log(error.message)
        res.status(500).json({success,error:"some error occurred"})
    }
})
router.post('/login',
[
    body('email','enter a valid email').isEmail(),
    body('password','enter a valid password').isLength({min:5})
],
async(req,res)=>{
    let success;
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        success=false
        return res.status(400).json({success,errors:errors.array()})
    }
    try{
        let user=await User.findOne({email:req.body.email})
        if(!user){
            return res.status(400).json({error:"Please enter correct email"})
        }
        const passcomp= await bcrypt.compare(req.body.password,user.password)
        if(!passcomp){
            success=false
            return res.status(400).json({success,error:"Please enter correct password"})
        }
        else{
            const data={
                user:{
                    id:user.id
                }
            }
            const jwtdata = jwt.sign(data,jwtsecret)
            success=true;
            res.json({success,authtoken:jwtdata})
        }
    }
    catch(error){
        console.log(error.message)
        res.status(500).send("internal server error")
    }
})
router.post('/getdetails',fetchuser,async(req,res)=>{
    try{
        userid=req.user.id
        const user = await User.findById(userid).select("-password")
        res.send(user)
    }
    catch(error){
        console.log(error.message)
        res.status(500).send("internal server error")
    }
})
module.exports=router