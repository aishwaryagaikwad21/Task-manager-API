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

const jwt = require('jsonwebtoken')
const myFunction = async()=>{
    const token = jwt.sign({ _id:'abc3' },'thisismycourse',{expiresIn:'7 days'})
    //console.log('token is')
    console.log(token)
    const data = jwt.verify(token,'thisismycourse') //user is authenticated properly
    console.log(data)
}
myFunction()

// const bcrypt = require('bcryptjs');
// const func = async()=>{
//  const password = 'PaVd6213@'
//  const hashPassword = await bcrypt.hash(password,8)
//  console.log(password)
//  console.log(hashPassword)
//  const isMatch = await bcrypt.compare('PaVd6213@',hashPassword)
//  console.log(isMatch)
// }
// func()
