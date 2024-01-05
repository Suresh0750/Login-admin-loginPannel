
const  mongoose  = require("mongoose")
const adminCollection = require("../models/adminData.js")
const userCollection = require("../models/userData.js")
const bcrypt = require("bcrypt")

const admin = async function(req,res){
    try{
        if(req.session.search){
            var allUserdata = req.session.search
            res.render("adminViews/adminHome",{allUserdata,addData})
        }else if(req.session.adminLogin==true)
        {
            var allUserdata = await userCollection.find()
            var addData=req.session.addData
             
            res.render("adminViews/adminHome",{allUserdata,addData})
            req.session.save();
            // console.log(`${req.session.addData}`)
            
        }else{
            // req.session.invalid;
            req.session.invalidId;
            console.log(req.session.invalidId)
            req.session.save()
            res.render("adminViews/admin",{invalidId:req.session.invalidId})
        }

    }catch(err){
        console.log(`Error from admin rutor \n ${err}`)
    }


}

const adminHome = async function(req,res){
        // console.log(req.body.adminEmail)
        // console.log(req.body.adminPass)

        try{
            let checkData = await adminCollection.findOne({adminEmail:req.body.adminEmail})
           // console.log(checkData)
        
            let adminEamil = checkData == null ? null : checkData.adminEmail;
            let adminPass = checkData == null ? null : checkData.adminPass;
        
            if(adminEamil==req.body.adminEmail && adminPass==req.body.adminPass)
            {
                req.session.adminLogin=true;
                res.redirect("/admin")
            }else{
                req.session.invalidId=true;
                res.redirect("/admin")
            }
        }catch(err){
            console.log(`Error from admin ruter \n ${err}`)
        }
       
} 

const addData = async function(req,res){

        const checkEmail= await userCollection.findOne({userEmail:req.body.userEmail})
        console.log("--enter the reqest-")
        try{
            if(!checkEmail)
            {
                let encrypted= await bcrypt.hash(req.body.userPass,10)

                // console.log(encrypted)
                // console.log('-------')
                // console.log(req.body.userName)
                // console.log(req.body.userNumber)
                const newData = await new userCollection({
                    userName:req.body.userName,
                    userNumber:req.body.userNumber,
                    userEmail:req.body.userEmail,
                    userPass:encrypted
                }).save()
                req.session.addData=false;
                res.redirect("/admin")
    
            }else{
                req.session.addData=true;
                req.session.save()
                res.redirect("/admin")
            }

        }catch(err){
            console.log(`error from add ${err}`)
        }

}

const dataEdit = async function(req,res){

    try{
       console.log('enter dataEdit')
        const id=(req.params.id).trim()
        // console.log(id)
        const editData= await userCollection.findById(id)
        // console.log(`------======----------`)
        // console.log(editData)
        // console.log(editData._id)
        // console.log(`------======----------`)
        res.render("adminViews/edit",{data:editData,invaliedEmail:false}) 
    }catch(err){
        console.log(`Error from dataEdit router \n ${err}`)
    }
    

}
 
const updateData =async function(req,res){

    try{
        console.log(`Enter updateData`)
        const id = (req.params.id).trim()
        console.log(id)        
        const checkUpdate = await userCollection.find({userEmail:`${req.body.userEmail}`})
        console.log(checkUpdate)
        // console.log(`id: \n ${checkUpdate[0]._id}`)
        if((checkUpdate.length==1 && checkUpdate[0]._id==id) || (checkUpdate.length==0))
        {
            await userCollection.findByIdAndUpdate(`${id}`,req.body,{new:true})
            req.session.adminLogin=true

        
            res.redirect("/admin")
        }else{
            const editdata = await userCollection.findOne({_id:`${id}`})       
           
            res.render("adminViews/edit",{data:editdata,invaliedEmail:true})
        }
    }catch(err){
        console.log(`Error from updateData router \n ${err}`)
    }

}
const adminLogout = function(req,res){
    req.session.search=false;
    req.session.invalidId=false;
    req.session.adminLogin=false;
    res.redirect("/admin")
}

const addUser = function(req,res){
    res.render("adminViews/insertUser")
}

const error = function (req,res){
    res.render("userViews/error")
}


const adminAdd = async function (req,res){

    try{
        
            const checkData = await userCollection.findOne({userEmail:req.body.userEmail})
            if(!checkData)
            {
                const encrypted = await bcrypt.hash(req.body.userPass,10)

                const newData = new userCollection({
                    userName:req.body.userName,
                    userNumber:req.body.userNumber,
                    userEmail:req.body.userEmail,
                    userPass:encrypted
                }).save()
               
                res.redirect("/admin")

            }else{

                res.render("/admin",{invaliedEmail:true})
            }

    }catch(err){

    }

}
// search user
const searchUser = async function(req,res)
{
    // res.send(`search : ${req.body.search}`)
    var search = req.body.search
    var searchData = await userCollection.find({
        $or: [
            { userName: { $regex: search, $options: "i" } },
            
          ],
        });
        if (searchData.length == 0) {
          req.session.search = null;
        }
        req.session.search = searchData;
        res.redirect("/admin")
        console.log(searchData)
    //  res.redirect("/adminHome");
      
}

const deleteData = async function(req,res){

    const id= req.params.id
    req.session.adminLogin=true;
    await userCollection.findByIdAndDelete({_id:`${id}`})

    res.redirect("/admin")
}


module.exports={admin,adminHome,addData,dataEdit,updateData,adminLogout,addUser,adminAdd,deleteData,searchUser,error}