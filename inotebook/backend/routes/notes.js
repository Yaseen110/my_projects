const express=require("express")
const router=express.Router()
const Notes=require("../models/Notes")
const fetchuser=require("../middleware/fetchuser")
const {body,validationResult} = require("express-validator")
router.post('/createnote',fetchuser,
[
    body('title','enter a valid title').exists(),
    body('description','enter a valid description').exists(),
],
async (req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    try{
        note= await Notes.create({
            title:req.body.title,
            description:req.body.description,
            tag:req.body.tag,
            user:req.user.id
        })
        res.json(note)
    }
    catch(error){
        console.log(error.message)
        res.status(500).send("some error occurred")
    }
})

router.get('/fetchallnotes',fetchuser,async (req,res)=>{
    const notes= await Notes.find({user:req.user.id})
    res.json(notes)
})
router.put('/updatenote/:id',fetchuser,
[
    body('title','enter a valid title').exists(),
    body('description','enter a valid description').exists(),
],
async (req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    try{
        let note=await Notes.findById(req.params.id)
        if(!note){
            return res.status(400).json({error:"No note with the following id"})
        }
        if(note.user.toString()!==req.user.id){
            res.json({error:"not allowed"})
        }
        const newnote={};
        if(req.body.title){newnote.title=req.body.title}
        if(req.body.description){newnote.description=req.body.description}
        if(req.body.tag){newnote.tag=req.body.tag}
        note=await Notes.findByIdAndUpdate(req.params.id,{$set:newnote},{new:true})
        res.json(note)
    }
    catch(error){
        console.log(error.message)
        res.status(500).send("some error occurred")
    }
})

router.delete('/deletenote/:id',fetchuser,async (req,res)=>{
    try{
        let note=await Notes.findById(req.params.id)
        if(!note){
            return res.status(400).json({error:"No note with the following id"})
        }
        if(note.user.toString()!==req.user.id){
            res.send("not allowed")
        }
        note=await Notes.findByIdAndDelete(req.params.id)
        res.json({success:"note deleted",note:note})
    }
    catch(error){
        console.log(error.message)
        res.status(500).send("some error occurred")
    }
})
module.exports=router