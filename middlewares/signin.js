const {User,Task}=require('../db')
async function userSiginMiddleware(req,res,next){
    
    const email=req.body.email
    const password=req.body.password
    const user=await User.find({
     
        email:email,
        password:password
    })
    if(user){
        next()
        
    }else{
        res.status(404).json({
        msg: "User not found",
        });
        
    }
}
module.exports = userSiginMiddleware;