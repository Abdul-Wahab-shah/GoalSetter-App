const mongoose=require('mongoose')
const userSchema=mongoose.Schema({

// user:{
// type:mongoose.Schema.Type.ObjectId,
// required:true,
// ref:'User'
// },

name:{
    type:String,
    required:[true,'Please add a name']
},
email:{
    type:String,
    required:[true,'Please add an email'],
    unique:true,
},
password:{
    type:String,
    required:[true,'Please add a strong password']
}

},
{
    timestampts:true
})
module.exports=mongoose.model('User',userSchema)
