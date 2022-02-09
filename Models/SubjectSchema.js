var mongoose = require('mongoose')

var mySchema = new mongoose.Schema({
    unitNames:  [
      {
      unitNo: String,
      unitTopics: [
        {
          topicName: String,
          topicUrl:String,
        }
      ],
      unitName:String,
      unitTwoMarks:Array,
      unitOneMarks:Array
    }
  ],

    className: String,
    mediumName: String,
    subjectName: String,
    boardName: String,
  });
  

module.exports = mySchema