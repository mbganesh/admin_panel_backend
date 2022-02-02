var express = require("express");
var router = express.Router();
var AdminModel = require("../Models/AdminLoginModel");
var mongoose = require("mongoose");
// var BoardModel = require("../Models/BoardSelectionModel");
const SubModel = require("../Models/SubjectSelectedModel");

mongoose.connect("mongodb://localhost/admin_panel");

router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/admin-login", async (req, res) => {
  let data = req.body;

  console.log(data);

  let foundAuth = await AdminModel.find({});

  console.log(foundAuth);

  if (foundAuth.length === 0) {
    let LoginModel = await AdminModel.insertMany(data);

    res.json({ message: "Login Success", success: true });
    
  } else {
    let user = foundAuth[0]["userName"];
    let pass = foundAuth[0]["passWord"];

    if (user === data["userName"] && pass === data["passWord"]) {
      res.json({ message: "Login Success", success: true });
    } else {
      res.json({ message: "Invalid UserName or PassWord", success: false });
    }

    
  }
});

// router.post("/board_selection", async (req, res) => {
//   let data = req.body;
//   var foundAuth = await AdminModel.findOne({});
//   if (
//     foundAuth["userName"] === data["userName"] &&
//     foundAuth["passWord"] === data["passWord"]
//   ) {
//     var foundBoard = await BoardModel.findOne({}, { _id: 0 });
//     res.json({ message: foundBoard, success: true });
//   } else {
//     res.json({ message: "Please Check UserName and PassWord", success: false });
//   }
// });

router.post("/subject_api", async (req, res) => {
  let subDetails = req.body.subDetails;
  let subName = req.body.subName;

  var myBoard = subDetails["board"];
  var myMedium = subDetails["medium"];
  var myClass = subDetails["class"];
  var mySubject = [];

  var obj = {
    myBoard: myBoard,
    myClass: myClass,
    myMedium: myMedium,
    mySubject: mySubject,
  };

  let SubjectModel = await SubModel.find({});

  if (SubjectModel.length === 0) {
    let StoreFirstData = await SubModel.insertMany(obj);
    console.log(StoreFirstData);
    console.log("StoreFirstData");
  } else {
    console.log("UpdateData");

    let foundData = await SubModel.find(
      { myBoard: myBoard, myClass: myClass, myMedium: myMedium },
      { _id: 0, __v: 0 }
    );

    console.log(foundData);

    if (foundData.length === 0) {
      let StoreSecondData = await SubModel.insertMany(obj);
      console.log(StoreSecondData);
      console.log("StoreSecondData");
    }

    if (subName !== "") {
      let updateData = await SubModel.findOneAndUpdate(
        { myBoard: myBoard, myClass: myClass, myMedium: myMedium },
        { $push: { mySubject: subName } },
        { _id: 0, __v: 0 }
      );
      console.log(updateData);
    }
  }

  res.json({ message: "Api Works" });
});

router.post("/subject_list_api", async (req, res) => {
  let subDetails = req.body.subDetails;

  var myBoard = subDetails["board"];
  var myMedium = subDetails["medium"];
  var myClass = subDetails["class"];

  let foundData = await SubModel.findOne(
    { myBoard: myBoard, myClass: myClass, myMedium: myMedium },
    { _id: 0, __v: 0 }
  );

  res.json(foundData);
});

router.post("/subject_edit_api", async (req, res) => {
  let subDetails = req.body.subDetails;
  let subName = req.body.subName;

  var myBoard = subDetails["board"];
  var myMedium = subDetails["medium"];
  var myClass = subDetails["class"];

  console.log(req.body);

  if (subName !== "") {
    let updateData = await SubModel.findOneAndUpdate(
      { myBoard: myBoard, myClass: myClass, myMedium: myMedium },
      { $pull: { mySubject: subName } },
      { _id: 0, __v: 0 }
    );
    console.log(updateData);
    res.json({ message: subName + " deleted." });
  }
});


router.post("/create-unit-api", async (req, res) => {
  var reqData = req.body;

  console.log(reqData);

  let className = reqData.className;
  let mediumName = reqData.mediumName;
  let subjectName = reqData.subjectName;
  let boardName = reqData.boardName;

  let collectionName = reqData.collectionName;

  let unitName = reqData.unitName;

  // create schema
  var mySchema = new mongoose.Schema({
    unitNames: Array,
    className: String,
    mediumName: String,
    subjectName: String,
    boardName: String,
    unitTopics: Array,
  });

  // create model
  var myModel =
    mongoose.models[collectionName] || mongoose.model(collectionName, mySchema);

  var checkModel = await myModel.find({});

  try {
    if (checkModel.length === 0) {
      console.log("1st time called");

      let storeData = await myModel.insertMany({
        className: className,
        mediumName: mediumName,
        subjectName: subjectName,
        boardName: boardName,
        unitNames: unitName,
      });
    } else {
      console.log("2nd time called");

      let updateValue = await myModel.findOneAndUpdate(
        {
          className: className,
          mediumName: mediumName,
          boardName: boardName,
          subjectName: subjectName,
        },
        { $push: { unitNames: unitName } },
        { _id: 0, __v: 0 }
      );

      console.log(updateValue);
    }

    res.json({ message: "data stored -- try", success: true });
  } catch (error) {
    console.log(error);
    res.json({ message: "data not stored -- catch", success: false });
  }
});

router.post('/list_unit_api' , async (req , res) => {
  let reqData = req.body

  
  console.log(reqData);

  let className = reqData.className;
  let mediumName = reqData.mediumName;
  let subjectName = reqData.subjectName;
  let boardName = reqData.boardName;

  let collectionName = reqData.collectionName;

  // let unitName = reqData.unitName;

  // create schema
  var mySchema = new mongoose.Schema({
    unitNames: Array,
    className: String,
    mediumName: String,
    subjectName: String,
    boardName: String,
    unitTopics: Array,
  });


  // create model
  var myModel =
    mongoose.models[collectionName] || mongoose.model(collectionName, mySchema);


 try {
  var checkModel = await myModel.findOne({} , {_id:0 , __v:0});
 } catch (error) {
  console.log('err -- catch'); 
 }

  console.log(checkModel);

  res.json(checkModel)

})

module.exports = router;
