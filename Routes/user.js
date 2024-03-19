const express = require("express");
const router = express.Router();
const User= require("../Schema/user.js")
const passport= require("passport")


router.get("/signup", (req, res)=>{
    res.render("signupform.ejs");
});

router.post("/signup", async (req, res)=>{
    let {username, email, password}= req.body;

    let newUser = new User({
        username : username,
        email : email
    });

    let registeredUser= await User.register(newUser, password);

    console.log(registeredUser);
    req.login(registeredUser, (err)=>{
        if(err){
            console.log("Error Occured in loggin in ");
            res.redirect("/login");
            return;
        }
        else{
            res.redirect("/listing"); 
        }
    });

    res.redirect("/listing");
});

router.get("/login", (req, res)=>{
    res.render("loginform.ejs");
});

router.post("/login",passport.authenticate("local", {failureRedirect:"/login"}) ,async (req, res)=>{
    let {username, password}= req.body;

    console.log("Welcome !, You are Logged in !");
    console.log("req.user is : ", req.user);
    res.redirect("/listing");
});

router.get("/logout", (req, res)=>{
    req.logout((err)=>{
        if(err){
            console.log("Error occured during LogOut");
        }
        else{
            console.log("Your are LOGGED OUT !");
        }
        res.redirect("/listing");
    });
})

module.exports= router;