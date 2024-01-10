const {User,Task}=require('../db')
async function userCheckMiddleware(req,res,next){
    const username=req.headers.username
    const email=req.headers.email
    const password=req.headers.password
    const user=await User.findOne({
        username:username,
        email:email,
        password:password
    })
    if(user){
        next()
    }else{
        res.status(400).json({
        msg: 'User not logedin',
      });
        
    }
}
module.exports = userCheckMiddleware;