const { render } = require('ejs');
const { Router } = require('express');
const express = require('express');
const router = express.Router();
const Account = require('../models/main');


router.get('/',(req,res)=>{
    res.render('login');
})

router.post('/',(req,res)=>{
    const userName = req.body.UserName;
    const password = req.body.Password;
    Account.find({UserName:userName},(err,data)=>{
        if (err){
            res.render('login',{
                errorMessage:"Something was wrong, please try again "
            });
            return;
        }
        if (data[0] == null){
            res.render('login',{
                errorMessage:"Username isn't exist "
            });
            return;
        }else{
            if (data[0].Password != password){
                res.render('login',{
                    errorMessage:"Password was wrong "
                });
                return;
            }else{
                res.render('',{
                    UserName:userName
                });
            }
        }
    })
})
module.exports = router;