const { render } = require('ejs');
const { Router } = require('express');
const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.render('report');
})

module.exports = router;