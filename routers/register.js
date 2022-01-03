const { render } = require('ejs');
const { Router } = require('express');
const express = require('express');
const router = express.Router();
const Account = require('../models/main');
router.get('/',(req,res)=>{
    res.render('register');
});
router.post('/',(req,res)=>{
    let userName = req.body.UserName;
    let password = req.body.Password;
    let rePassword = req.body.rePassword;
    if (userName == null || userName == ''){
        res.render('register',{
            errorMessage:"Please enter your user name "
        });
        return;
    }else if (password == null || password == ''){
        console.log(userName);
        console.log(password);
        console.log(rePassword);
        res.render('register',{
            errorMessage:"Please enter your password "
        });
        return;
    }else if (rePassword == null || rePassword == ''){
        console.log(userName);
        console.log(password);
        console.log(rePassword);
        res.render('register',{
            errorMessage:"Please enter your password once again "
        });
        return;
    }else{
        if (password != rePassword){
            res.render('register',{
                errorMessage:"Password isn't match "
            });
            return;
        }else{
            Account.find({UserName: userName},async (err,data)=>{
                if (err){
                    res.render('register',{
                        errorMessage:"Something was wrong, please try again "
                    });
                    return;
                }
                if (data[0] != null){
                    res.render('register',{
                        errorMessage:"User name was exist, please register again "
                    });
                    return;
                }
                const newAccount =await new Account({UserName:userName,Password:password});
                newAccount.save();
                res.render('register',{success:"Register sucessful, Login now "});
            });
        }
    }
})
module.exports = router;