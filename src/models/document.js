const mongoose = require('mongoose');
const documentSchema = new mongoose.Schema({
    description:{
        type:String
    },
    status:{
        type:Boolean
    }
})
const Document = mongoose.model('Document',documentSchema)

documentSchema.pre('save',async function(next){
    console.log('middleware running for document')
    next()
})

module.exports = Document