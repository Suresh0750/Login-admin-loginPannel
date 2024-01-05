const mongoose = require("mongoose")

// console.log(mongoose)


const connectDB = async()=>{
    try{
        console.log(process.env.MONGO_URL);
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`mongodb is connect is succussfull`)

    }catch(err){
        console.log(`error from mongoose connection ${err}`)
    }

}

module.exports = connectDB