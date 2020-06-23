const mongoose = require('mongoose');
const documentSchema = new mongoose.Schema({
    description:{
        type:String,
        required:true
    },
    status:{
        type:Boolean,
        default:false
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId, //data stored will be object id
        required:true,
        //helper function
        ref:'User' //reference to user model
    }
},{
    timestamps:true
})
const Document = mongoose.model('Document',documentSchema)

documentSchema.pre('save',async function(next){
    console.log('middleware running for document')
    next()
})

module.exports = Document