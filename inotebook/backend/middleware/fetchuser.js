const jwt=require("jsonwebtoken")
const jwtsecret="mynameismdyaseenandiamagoodboy"
const fetchuser=(req,res,next)=>{
    const token=req.header('auth-token')
    if(!token){
        res.status(401).send({error:"please enter using a valid token"})
    }
    try{
        const data=jwt.verify(token,jwtsecret)
        req.user=data.user
        next()
    }
    catch(error){
        console.log(error.message)
        res.status(401).send("some error occurred")
    }
}
module.exports=fetchuser