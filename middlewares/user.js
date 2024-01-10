const {User,Task}=require('../db')
async function userMiddleware(req,res,next){
    const username=req.body.username
    const email=req.body.email
    const password=req.body.password
    const user=await User.findOne({
        username:username,
        email:email,
        password:password
    })
    if(user){
        res.status(400).json({
        msg: 'User already exists',
      });
    
    }else{
        next()
    }
}


module.exports = userMiddleware;