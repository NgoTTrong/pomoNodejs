require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const path = require("path");
const app = express();
const indexRouter = require('./routers/index');
const loginRouter = require('./routers/login');
const reportRouter = require('./routers/report');
const settingRouter = require('./routers/setting');
const registerRouter = require('./routers/register');
mongoose.connect(process.env.DATABASE_PATH,()=>console.log('Connect to DB successful <3'));
app.use(express.static(path.join(__dirname, "public")));


app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))
app.use(express.static('public'));
app.use(expressLayouts);
app.set('views',__dirname + '/views');
app.set('layout', 'layouts/layout');
app.set('view engine', 'ejs');


app.use('/',indexRouter);
app.use('/login',loginRouter);
app.use('/report',reportRouter);
app.use('/setting',settingRouter);
app.use('/register',registerRouter);

const port = process.env.PORT || 3000;
app.listen(port);