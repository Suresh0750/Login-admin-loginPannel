const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({

    userName:{
        type:String
    },
    userNumber:{
        type:Number
    },
    userEmail:{
        type:String
    },
    userPass:{
        type: String
    }

})
const userCollection = mongoose.model('userdatas',userSchema)

module.exports=userCollection
