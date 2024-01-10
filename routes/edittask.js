const express=require('express')
const userCheckMiddleware=require('../middlewares/usercheck')
const { User, Task } = require('../db');
const router = express.Router();
const app = express();
app.use(express.json());

router.post('/edit',userCheckMiddleware,async(req,res)=>{
    const { taskId, title } = req.body;
    const email = req.headers.email;
    try{
            const user = await User.findOne({ email});
            if (!user){
                return res.status(404).json({
                    msg:"user not found"
                })
            }
        const taskToUpdate = user.todoTasks.find(task => task._id.toString() === taskId);

        if (!taskToUpdate) {
            return res.status(404).json({
                msg: "Task not found"
            });
        }

        
        taskToUpdate.title = title;
        await user.save();
        res.json({
                msg: 'Task updated successfully',
                task: taskToUpdate
        });
    } catch (error) {
        console.error('Error adding task:', error);
        res.status(500).json({
            msg: 'Internal server error in editing task',
        });
    }
})



module.exports = router;
