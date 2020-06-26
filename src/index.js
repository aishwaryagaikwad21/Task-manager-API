const express = require('express');
require('./db/mongoose')

const userRouter = require('./router/user')
const documentRoute = require('./router/document')
const app = express();


const port = process.env.PORT || 8000;

 const multer = require('multer');
 const upload = multer({
     dest:'images/', //destination to store images
     onError:function(err,next){
         console.log('error',err)
         next(err);
     },
     limits:{
         fileSize:1000000 //1 MB
     },
     fileFilter(req,file,cb){ //cb tells multers when filtering is completed
        if(file.originalname.endsWith('.pdf')){
            cb(undefined,true)
            
        }
        else if(file.originalname.match(/\.(docx|doc)$/)){ //using regex
            cb(undefined,true) 
        }
        else{
            return cb(new Error('Please upload a pdf or word document'))
        }
        
        // cb(new Error('File must be a pdf'))
        // cb(undefined,true) //accept the upload
        // cb(undefined,false) //reject the upload
     }
 })
 
 app.post('/upload',upload.single('uploads'),(req,res)=>{
     try{
        res.status(200).send()
     }catch(e){
        res.status(404).send(e)
     }
 },(error,req,res,next)=>{
     res.status(400).send({error:error.message})
 })
//use form-data in postman

app.use(express.json()); //parse incoming json
app.use(userRouter);
app.use(documentRoute);

app.listen(port,()=>{
    console.log('Server is up on port 8000');
})





// const jwt = require('jsonwebtoken')
// const myFunction = async()=>{
//     const token = jwt.sign({ _id:'abc3' },'thisismycourse',{expiresIn:'7 days'})
//     //console.log('token is')
//     //console.log(token)
//     const data = jwt.verify(token,'thisismycourse') //user is authenticated properly
    
//     //console.log(data)
// }
// myFunction()

// const data = {
//     name:'aish'
// }
// data.toJSon = function(){
//     return {}
//     // console.log(this)
//     // return this
// }
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


//const Task = require('./models/document')
//  const findOwnerofTask = async()=>{
//       const task = await Task.findById('5ef1c4bbc5383f152862870a')
//       await task.populate('owner').execPopulate()//populate is used to populate data from relation
//       //above statement will find owner of that particular task
//       //console.log(task.owner)
//       //mongoose can setup relation between two models
//   }
//   findOwnerofTask()

//  const User = require('./models/user')
//  const findTaskOfOwner = async()=>{
//      const user = await User.findById('5ef1c48cc5383f1528628707')
//      await user.populate('tasks').execPopulate()
//      //console.log(user.tasks)
//  }
//  findTaskOfOwner()

