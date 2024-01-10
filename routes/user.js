const express = require('express');
const userMiddleware = require('../middlewares/user');

const { User,Task } = require('../db');
const router = express.Router();

router.post('/signup', userMiddleware, async (req, res) => {
  const { username, email, password } = req.body;

  try {

    // Create a new user
    const newUser = await User.create({
      username: username,
      email: email,
      password: password,
    });

    res.json({
      msg: 'User created successfully',
      user: newUser,
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({
      msg: 'Internal server error',
    });
  }
});


router.post('/login',async (req,res)=>{
    const {username, email, password } = req.body;
    
    try{
        const user=await User.findOne({
        
        email:email,
        password:password 
    }).populate('todoTasks')
    
    
    if (user && user.todoTasks.length==0){
        res.json({
            msg:"no tasks left"
        })

    }else if(user && user.todoTasks.length>0 ){
        res.json({
        tasks:user.todoTasks
            
        })


    }else{
        res.status(404).json({msg:'not found'})
    }
    
    }
    catch(error){
        console.error('Error creating user:', error);
        res.status(500).json({
        msg: 'Internal server error in routes ',
        });

    }
})
module.exports = router;
