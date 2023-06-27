const express=require("express")
const path=require("path")
const app = express()
app.use(express.static(path.join(__dirname,"/public")))
app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"/public/index.html"))
})
app.get("/home",(req,res)=>{
    res.sendFile(path.join(__dirname,"/public/index.html"))
})
app.get("/Blogs",(req,res)=>{
    res.sendFile(path.join(__dirname,"/public/blogs.html"))
})
app.get("/skills",(req,res)=>{
    res.sendFile(path.join(__dirname,"/public/skills.html"))
})
app.get("/cv",(req,res)=>{
    res.sendFile(path.join(__dirname,"/public/cv.html"))
})
app.get("/contact",(req,res)=>{
    res.sendFile(path.join(__dirname,"/public/contact.html"))
})
app.listen(8000,()=>{
    console.log("listening at port no 8000")
})