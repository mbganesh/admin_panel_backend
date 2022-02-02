var mongoose = require('mongoose')

var LoginSchema = new mongoose.Schema({
    userName:String,
    passWord:String
})

var LoginModel = mongoose.model('admin_login' , LoginSchema)

module.exports = LoginModel