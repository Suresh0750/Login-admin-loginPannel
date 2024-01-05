const userCollection = require("../models/userData.js")
const bcrypt = require("bcrypt")

console.log('hi hello')

const loginPage =function(req,res){
    console.log('step 1')
    if(req.session.isLogin==true)
    {
      console.log(req.session.isLogin)
      res.render("userViews/home",{cards})
    }else{

      res.render("userViews/userLogin",{isNotCorrect:req.session.isNotCorrect})
      req.session.isNotCorrect=null;
      req.session.error=false;
      req.session.save()
    }
   
}



const singUpPage = function(req,res){
    
      try{
        if(req.session.isLogin!=true)
        {
          req.session.error;
          res.render("userViews/signUp",{invalid:req.session.emailIsExit,empty:req.session.error,isNan:req.session.isNaN})
          req.session.error=false;
          req.session.emailIsExit=false;
          req.session.isNaN=false;
          res.session.save()
        }

      }catch(err){
          console.log(`errom from:\n ${err}`)
      }
      
  }
const redirect = async function(req,res){
            
        try{

            var userName = (req.body.userName).trim()
            var userPass = (req.body.userPass).trim()
            
            if(userName.length==0 || userPass.length==0)
            {
              req.session.error= true;
              res.redirect("/signUp")
            }
            if(isNaN(req.body.userNumber))
            {
              req.session.isNaN=true;
              res.redirect("/signUp")
            }
            let thisUser = await userCollection.findOne({userEmail:req.body.userEmail})
          
            console.log(thisUser)
            if(!thisUser)
            {
                let encrypted = await bcrypt.hash(req.body.userPass,10)
                
                console.log(req.body.userPass)
                console.log(encrypted)
                let newUser = await new userCollection({
                    userName :req.body.userName,
                    userNumber:req.body.userNumber,
                    userEmail : req.body.userEmail,
                    userPass : encrypted,
    
                }).save()
    
              
    
                res.redirect("/")
                // alert('succeusfully created')
    
            }else{
              req.session.emailIsExit=true;
                res.redirect("/signUp")
            }
        }catch(err){

          console.log(`Err: ${err}`)
        }
        

    }

//Pass the object in home page
const cards=[
            {
              header:"GeeksforGeeks",
              image:"https://media.geeksforgeeks.org/wp-content/cdn-uploads/20210322182256/AngularJS-Tutorial.png",
              title:"Angular JS",
              desc:"AngularJS is a Javascript open-source front-end framework that is mainly used to develop single-page web applications(SPAs)."
            },
            {
              header:"GeeksforGeeks",
              image:"https://media.geeksforgeeks.org/wp-content/cdn-uploads/20210322182256/AngularJS-Tutorial.png",
              title:"Angular JS",
              desc:"AngularJS is a Javascript open-source front-end framework that is mainly used to develop single-page web applications(SPAs)."
            },
            {
              header:"GeeksforGeeks",
              image:"https://media.geeksforgeeks.org/wp-content/cdn-uploads/20210322182256/AngularJS-Tutorial.png",
              title:"Angular JS",
              desc:"AngularJS is a Javascript open-source front-end framework that is mainly used to develop single-page web applications(SPAs)."
            },
            {
              header:"GeeksforGeeks",
              image:"https://media.geeksforgeeks.org/wp-content/cdn-uploads/20210322182256/AngularJS-Tutorial.png",
              title:"Angular JS",
              desc:"AngularJS is a Javascript open-source front-end framework that is mainly used to develop single-page web applications(SPAs)."
            }
          ]
  //login page user login while what it do
const homePage = async function(req,res){

    try{
          let userId=await userCollection.findOne({userEmail:req.body.userEmail})
          console.log(userId)
      
      
          let email = userId== null ? null:userId.userEmail;
          let pass = userId== null ? null: userId.userPass;
          console.log(`email \n ${email}`)
          console.log(`pass \n ${pass}`)

          if(pass==null){
            console.log('hello')
            req.session.isNotCorrect=true;
            res.redirect("/")
          }
          //!-- compare the user password user password and alredy save bcyrpt password
          
         
              var isMatch=false;
              console.log(`checking dat`)
             isMatch= await bcrypt.compare(`${req.body.userPass}`,pass)
             console.log(isMatch)
              if(email===req.body.userEmail && isMatch)
              {
                req.session.isLogin=true
                res.redirect("/")
              }else{
                console.log('hello')
                req.session.isNotCorrect=true;
                res.redirect("/")
            }
            
          



    }catch(err){
      console.log(`Error from homePage ruter \n ${err}`)
    }
 
}



const logout = function (req,res){

          req.session.isLogin=false;
          res.redirect("/");

}


module.exports = {loginPage,singUpPage,redirect,homePage,logout}
