const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false
})


// const User = mongoose.model('User',{
//     name:{
//         type:String,
//         required:true,
//         trim:true
//     },
//     email:{
//         type:String,
//         required:true,
//         trim:true,
//         lowercase:true,
//         validate(value){
//             console.log(value)
//             if(validator.isEmail(value)){
//                 throw new Error('Email is invalid')
//             }
//         }
//     },
//     password:{
//         type:String,
//         required:true,
//         minlength:7,
//         trim:true,
//         validate(value){
//             if(value.toLowerCase().includes('password')){
//                 throw new Error('set another password')
//             }
//         }
//     },
//     age:{
//         type:Number,
        
//         required:true,
//         validate(value){
//             if(value<0){
//                 throw new Error('Age must be positive number')
//             }
//         }
//     }
// })

// const me = new User({
//     name:'aishwarya',
//     email:'AHGHVHJHJH w',
//     password:'aishwarya',
//     age:20
    
// })
// me.save().then((me)=>{
//     console.log(me)
// }).catch((error)=>{
//     console.log('Error',error)
// })

    

// const report = new docs({
//     description:'analysis'
// })
// report.save().then((report)=>{
//     console.log(report)
// }).catch((err)=>{
//     console.log('error',err);
// })
// const User = mongoose.model('User',{
//     name:{
//         type:String
//     },
//     age:{
//         type:Number
//     }
// })
// const me = new User({
//     name:'aish',
//     age:20
// })

// me.save().then((me)=>{
//     console.log(me)
// }).catch((error)=>{
//     console.log('error',error)
// })

// const docs = mongoose.model('documents',{
//     description:{
//         type:String,
//         required:true
//     },
//     status:{
//         type:Boolean
//     }
// })