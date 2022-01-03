const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let schema = new Schema({
    UserName:{type:String,required:true},
    Password:{type:String,required:true},
    createdAt: { type: Date, required: true, default: Date.now }
});

const Account = mongoose.model("Account", schema);

module.exports = Account;