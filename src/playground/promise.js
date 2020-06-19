require('../db/mongoose')
const User = require('../models/user')

// User.findByIdAndUpdate('5ecbe858f46de037d8e1a1b0',{age:22}).then((user)=>{
//     console.log(user)
//     return User.countDocuments({age:22})
// }).then((result)=>{
//     console.log(result)
// }).catch((e)=>{
//     console.log(e)
// })

const updateAgeandCount = async(id,age) =>{
    const user = await User.findByIdAndUpdate(id,{age:age})
    const count = await User.countDocuments({age:age})
    return count
}

updateAgeandCount('5ecc310c06d7bd26ec9902e2',25).then((count)=>{
    console.log(count)
}).catch((e)=>{
    console.log(e)
})