var mongoose = require('mongoose')

var BoardSchema = new mongoose.Schema({
    allBoard:Array,
    allMedium:Array,
    allClass:Array
})

var BoardModel = mongoose.model('board_selection' , BoardSchema)

module.exports = BoardModel