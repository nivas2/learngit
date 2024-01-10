const express = require('express');
const app = express();
const userRouter = require('./routes/user');
const usercheckRouter=require('./routes/addtask');
const editRouter=require('./routes/edittask');
app.use(express.json());

// Use the userRouter for the /signup route
app.use('/api', userRouter);
app.use('/api', usercheckRouter);
app.use('/api', editRouter);
app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
