const connectToMongo=require('./db')
connectToMongo()
const express=require("express")
const app=express()
const cors=require('cors')
const port=5000
app.use(cors())
app.use(express.json()) // required to use req.body in code
app.get('/',(req,res)=>{
    res.send("hello welcome to the homepage of inotebook goto /api/auth for auth and /api/notes for notes")
})
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))
app.listen(port,()=>{
    console.log(`backend database listening at http://localhost:${port}`)
})