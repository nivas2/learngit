const express = require('express');
const userCheckMiddleware=require('../middlewares/usercheck')
const { User, Task } = require('../db');
const router = express.Router();
const app = express();
app.use(express.json());
router.post('/addtask',userCheckMiddleware,async (req,res)=>{
    const  title  = req.body.title;
    const email = req.headers.email;
    try{
            const user = await User.findOne({ email});
            if (!user){
                return res.status(404).json({
                    msg:"user not found"
                })
            }
            const newTask = await Task.create({
            title: title,
            status: "Not completed"
        });
        
        user.todoTasks.push(newTask);
        await user.save();
        res.json({
                msg: 'Task added successfully',
                task: user
        });
    } catch (error) {
        console.error('Error adding task:', error);
        res.status(500).json({
            msg: 'Internal server error in adding task',
        });
    }
})
module.exports = router;
