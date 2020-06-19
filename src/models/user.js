const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const validator = require('validator');
const jwt = require('jsonwebtoken')
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        unique:true,
        required:true,
        trim:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true,
        
        trim:true,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('set another password')
            }
        }
    },
    age:{
        type:Number,
        required:true,
        validate(value){
            if(value<0){
                throw new Error('Age must be positive number')
            }
        }
    },
    tokens:[{ //array of objects
        token:{
        type:String,
        required:true
        }
    }]
})

userSchema.methods.getPublicProfile = function(){
    const user = this
    //get raw object with data attached
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.tokens
    return userObject
}

userSchema.methods.generateAuthToken = async function(){
    //calling on specific user
    const user = this
    const token = jwt.sign({_id:user._id.toString()},'thisismynewcourse')
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

userSchema.statics.findByCredentials = async (email,password)=>{
    const user = await User.findOne({email})
    if(!user){
        throw new Error('Unable to Login')
    }
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch){
        throw new Error('Wrong password')
    }

    return user
}


//arrow function dont bind this
userSchema.pre('save',async function(next){
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8)
    }
    // if(user.isModified('password')){
        
    //     user.password = await bcrypt.hash(user.password,8)
    // }

     next()
})

const User = mongoose.model('User',userSchema)

module.exports = User