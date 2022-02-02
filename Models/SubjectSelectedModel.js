var mongoose = require('mongoose')

var SubSchema = new mongoose.Schema({
    myBoard:String,
    myClass:String,
    myMedium:String,
    mySubject:Array
})

var SubModel = mongoose.model('all_subject_data' , SubSchema)

module.exports = SubModel;