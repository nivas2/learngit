const mongoose = require('mongoose');
const { string } = require('zod');
const password = encodeURIComponent('Nivas@10');
mongoose.connect(`mongodb+srv://nivas10nani10:${password}@cluster0.ibl9uxn.mongodb.net/todo_app`)

const Userschema=new mongoose.Schema({
    username:String,
    email:String,
    password:String,
    todoTasks:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Task'
    }]

})

const Taskschema=new mongoose.Schema({
    title:String,
    status:{
        type:String,
        default:"Not completed"
    }
})

const User=mongoose.model('User',Userschema)
const Task=mongoose.model('Task',Taskschema)

module.exports={
    User,
    Task
}