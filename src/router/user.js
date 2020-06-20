const express = require('express')

const router = new express.Router()
const User = require('../models/user')
const auth = require('../middleware/auth')
router.post('/users',async (req,res)=>{
    const user = new User(req.body)
    try{
        await user.save()
        const token = await user.generateAuthToken() //since function is asynchronous we use await
        res.status(200).send({user,token})
    }catch(e){
        res.status(400).send(e)
    }
})

router.post('/users/login',async (req,res)=>{
    try{
        const user = await User.findByCredentials(req.body.email,req.body.password)
        //User = all the users in database and user = particular user
        const token = await user.generateAuthToken()
        res.send({user,token})
    }catch(e){
        res.status(400).send(e)
    }
})

router.post('/users/logout',auth,async(req,res)=>{
        //target to specific token when logged in from one device
        try{
            req.user.tokens = req.user.tokens.filter((token)=>{
                return token.token !== req.token
            })
            await req.user.save()
            res.send()
        }catch(e){
            res.status(500).send()
        }
})

//to logout of all of the sessions 
router.post('/users/logoutAll',auth,async(req,res)=>{
    try{
        req.user.tokens = []
        await req.user.save()
        res.send()
    }catch(e){
        res.status(500).send()
    }
})


router.get('/users/me', auth, async (req,res)=>{ //middleware is going to run first
    res.send(req.user)


    // User.find({}).then((users)=>{
    //     res.send(users)
    // }).catch((error)=>{
    //     res.status(500).send()
    // })
})

// router.get('/users/me',auth,async (req,res)=>{
//     //const _id = req.params.id
//     try{
//          await User.findById(req.user)
//         // if(!user){
//         //     return res.status(404).send()
//         // }
//         res.send(req.user)
//     }catch(e){
//         res.status(500).send()
//     }

//     // User.findById(_id).then((user)=>{
//     //     if(!user){
//     //         return res.status(404).send()
//     //     }
//     //     res.send(user)
//     // }).catch((error)=>{
//     //     res.status(500).send()
//     // })
//     //console.log(req.params)
// })

router.patch('/users/me',auth, async(req,res)=>{
    const updates = Object.keys(req.body) //array of key
    const allowedUpdates = ['name','email','password','age']
    const isValidUpdate = updates.every((update)=> allowedUpdates.includes(update))
    if(!isValidUpdate){
        return res.status(400).send({error:'Invalid updates'})
    }

    try{
        //const user = await User.findById(req.params.id)
        updates.forEach((update)=>req.user[update] = req.body[update])
        await req.user.save()

        //const user = await User.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidator:true})
        res.send(req.user)

    } catch(e){
        res.status(400).send(e)
    }
})

router.delete('/users/me',auth,async(req,res)=>{
    try{
        //access to user object bcoz of auth
        // const user = await User.findByIdAndDelete(req.user._id)
        // if(!user){
        //     return res.status(404).send()
        // }
        await req.user.remove()
        res.status(200).send(req.user)
    }catch(e){
        res.status(500).send()
    }
})

module.exports = router