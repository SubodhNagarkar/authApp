const express = require("express");
const router = express.Router();


const {login,signup} = require("../controller/Auth")
const {auth,isStudent,isAdmin} =require("../middlewares/auth")
router.post("/login",login);
router.post("/signup",signup);

router.get("/Student",auth,isStudent,(req,res) =>{
    res.json({
        sucess:true,
        message:"welcome to the protected route for Students",
    });
});
router.get("/Admin",auth,isAdmin,(req,res) =>{
    res.json({
        sucess:true,
        message:"welcome to the protected route for Admin",
    });
});
module.exports =router;