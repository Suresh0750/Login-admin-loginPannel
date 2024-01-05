const express = require("express")
const app = express()
const session = require("express-session")
const path = require("path")
const dotenv = require("dotenv")
const connectDB = require("./connectDB/databaseModel.js")
const router = require("./routes/userRouts.js")
const adminRouter = require("./routes/adminRouts.js")
const nocache = require("nocache")


// dotenv config you do this, you can use it everywhere
dotenv.config()

// dotenv do after call connectDB 
connectDB()


//express session 
app.use(
    session({
      resave: true,
      saveUninitialized: true,
      secret: "my secret",
    })
  );
  

app.use(express.static(path.join(__dirname,"public")))

app.set("view engine","ejs")

// first connect the json after connect router
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use((req,res,next)=>{
  res.set("Cache-Control","no-store")
  next()
})

app.use(nocache())
app.use(router)
app.use(adminRouter)



  


const PORT =process.env.PORT || 4053

app.listen(PORT,()=>{console.log(`This Server is running on http://localhost:${PORT}`)})