const express = require('express');
require('./db/mongoose')
//const User = require('./models/user');
//const Document = require('./models/document');

const userRouter = require('./router/user')
const documentRoute = require('./router/document')
const app = express();


const port = process.env.PORT || 8000;

app.use(express.json()); //parse incoming json
app.use(userRouter);
app.use(documentRoute);

app.listen(port,()=>{
    console.log('Server is up on port 8000');
})

const Task = require('./models/document')
const findOwnerofTask = async()=>{
     const task = await Task.findById('5eedf53a938eeb30fce76db1')
     await task.populate('owner').execPopulate()//populate is used to populate data from relation
     //above statement will find owner of that particular task
     //console.log(task.owner)
     //mongoose can setup relation between two models
 }
 findOwnerofTask()

const User = require('./models/user')
const findTaskOfOwner = async()=>{
    const user = await User.findById('5eedf01cafae4346dced1c23')
    await user.populate('tasks').execPopulate()
    //console.log(user.tasks)
}
findTaskOfOwner()

const jwt = require('jsonwebtoken')
const myFunction = async()=>{
    const token = jwt.sign({ _id:'abc3' },'thisismycourse',{expiresIn:'7 days'})
    //console.log('token is')
    //console.log(token)
    const data = jwt.verify(token,'thisismycourse') //user is authenticated properly
    
    //console.log(data)
}
myFunction()

const data = {
    name:'aish'
}
data.toJSon = function(){
    return {}
    // console.log(this)
    // return this
}
//when res.send() is called express calls JSON.stringify()
//console.log(JSON.stringify(data))

// const bcrypt = require('bcryptjs');
// const func = async()=>{
//  
//  const hashPassword = await bcrypt.hash(password,8)
//  console.log(password)
//  console.log(hashPassword)
//  const isMatch = await bcrypt.compare('PaVd6213@',hashPassword)
//  console.log(isMatch)
// }
// func()
