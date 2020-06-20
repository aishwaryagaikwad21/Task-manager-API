const express = require('express')
const route = new express.Router()
const Document = require('../models/document')
const auth = require('../middleware/auth')
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

route.get('/task',async(req,res)=>{
    try{
        const tasks = await Document.find({})
        if(!tasks){
            return res.status(404).send()
        }
        res.status(200).send(tasks)
    }catch(e){
        res.status(500).send()
    }
})

route.get('/task/:id', async(req,res)=>{
    try{
        const _id = req.params.id
        const task = await Document.findById(_id)
        if(!task){
            return res.status(400).send()
        }
        res.status(200).send(task)
    }catch(e){
        res.status(500).send()
    }
})

route.patch('/task/:id',async(req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description','status']
    const isValid = updates.every((update)=> allowedUpdates.includes(update))
    if(!isValid){
        return res.status(400).send({error:'Invalid Update'})
    }

    try{
        const task = await Document.findById(req.params.id)
        updates.forEach((update)=> {task[update] = req.body[update]})

        await task.save()
        //const task = await  Document.findByIdAndUpdate(req.params.id,req.body,{new:true,validator:true})
        if(!task){
            return res.status(404).send()
        }
        res.status(200).send(task)
    }catch(e){
        res.status(400).send(e)
    }
})

route.delete('/task/:id',async(req,res)=>{
    try{
        const task = await Document.findByIdAndDelete(req.params.id)
        if(!task){
            return res.status(404).send()
        }
        res.status(200).send(task)
    }catch(e){
        res.status(500).send()
    }
})

module.exports = route