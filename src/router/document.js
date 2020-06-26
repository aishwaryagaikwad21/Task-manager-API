const express = require('express')
const route = new express.Router()
const Document = require('../models/document')
const auth = require('../middleware/auth')
const multer = require('multer')
route.post('/task',auth,async (req,res)=>{
    //const docs = new Document(req.body);
    const docs = new Document({
        //provide our own object
        ...req.body, //ES6 spread operator-copies all data to object
        owner:req.user._id
    })
    try{
        await docs.save()
        res.status(200).send(docs)
    }catch(e){
        res.status(500).send()
    }
})

//GET /task?status=true
//for pagination use options property GET/tasks?limit=10 skip=0
route.get('/task',auth,async(req,res)=>{
    const match={}
    const sort = {}
    if(req.query.sortBy){
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc'?-1:1
    }
    if(req.query.status){
        match.status = req.query.status === 'true'
    }
    try{
        const tasks = await Document.find({owner:req.user._id})
        await req.user.populate({
            path:'tasks',
            match,
            options:{
               limit:parseInt(req.query.limit),
               skip:parseInt(req.query.skip),
               sort
            }
        }).execPopulate()
        res.status(200).send(req.user.tasks)
    }catch(e){
        res.status(500).send()
    }
})

route.get('/task/:id',auth,async(req,res)=>{
    try{
         const _id = req.params.id
         const task = await Document.findById(_id)
       // const task = await Document.findOne({ _id,owner:req.user._id})
        if(!task){
            return res.status(400).send()
        }
        res.status(200).send(task)
    }catch(e){
        res.status(500).send()
    }
})

route.patch('/task/:id',auth,async(req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description','status']
    const isValid = updates.every((update)=> allowedUpdates.includes(update))
    if(!isValid){
        return res.status(400).send({error:'Invalid Update'})
    }

    try{
        const task = await Document.findOne({_id:req.params.id,owner:req.user._id})
        //const task = await Document.findById(req.params.id)
        //const task = await  Document.findByIdAndUpdate(req.params.id,req.body,{new:true,validator:true})
        if(!task){
            return res.status(404).send()
        }
        updates.forEach((update)=> {task[update] = req.body[update]})

        await task.save()
        res.status(200).send(task)
    }catch(e){
        res.status(400).send(e)
    }
})

route.delete('/task/:id',auth,async(req,res)=>{
    try{
        //const task = await Document.findByIdAndDelete({_id:req.params.id,owner:req.user._id})
        const task = await Document.findOneAndDelete({_id:req.params.id,owner:req.user._id})
        if(!task){
            return res.status(404).send()
        }
        res.status(200).send(task)
    }catch(e){
        res.status(500).send()
    }
})
const upload = multer({
    //dest:'profile',
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
route.post('/users/me/profile',auth,upload.single('profile'), async (req,res)=>{
    req.user.profile = req.file.buffer
    await req.user.save()
    res.send()
},(error,req,res,next)=>{
    res.status(400).send({error:error.message})
})

route.delete('/users/me/profile',auth,async(req,res)=>{
    req.user.profile = undefined
    await req.user.save()
    res.status(200).send()
})

module.exports = route