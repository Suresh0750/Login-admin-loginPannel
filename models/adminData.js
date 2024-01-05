const mongoose = require("mongoose")

const adminSchema = new mongoose.Schema({
    adminEmail:{
        type:String
    },
    adminPass:{
        type:String
    }
})

const adminCollection = mongoose.model("adminData",adminSchema)

module.exports= adminCollection;