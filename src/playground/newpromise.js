require('../db/mongoose');
var Document = require('../models/document');

// Document.findByIdAndDelete('5ec65a3fba5a5838c0f39953').then((user)=>{
//     console.log('user deleted')
//     return Document.countDocuments({status:false})
// }).then((numb)=>{
//     console.log(numb + 'tasks left')
// }).catch((e)=>{
//     console.log(e)
// })
const updateAndDelete = async (id)=>{
    const upd = await Document.findByIdAndDelete(id)
    const task = await Document.countDocuments({status:false})
    return task
}

updateAndDelete('5ed40247810380f06563ae22').then((task)=>{
    console.log(task)
}).catch((e)=>{
    console.log(e)
})