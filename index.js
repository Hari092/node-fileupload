const express = require("express");
const app = express();
const port = 5000;
const path = require("path");
const multer = require("multer");
const router = require("./Router/router");
const uploads = require("./Router/uploads")

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
    //cb(null,"uploads") null is for eror and uploads is for image folder we can directly use destination: "uploads"=>fildername
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.filename + "_" + Date.now() + path.extname(file.originalname)
    );
    // in filename function is mandatory
  },
});

const upload=multer({
    storage: storage,
    limits:{
        fileSize: 2*1000*1000,
    },
    fileFilter: function(req, file, cb){
        // if(file.mimetype===/jpeg|jpg|png/)
        let fileType =/jpeg|jpg|png/;
        let mimetype = fileType.test(file.mimetype); // used to test jpg or png or jpeg or other type 
        let extname = fileType.test(path.extname(file.originalname)) //used to get type of files
        
        if(mimetype && extname){
            return cb(null, true); // this true is used to accept the file
        }
        cb("Error : file supports only these types" + fileType)
    }
  }).single("pic") // single return middleware


app.use("/",router);
app.use('/uploads',uploads)
app.post("/uploads",(req,res)=>{
    upload(req,res,function(err){
        if(err){
            res.send(err)
        }
        else{
            // alert("Uploaded")
            res.send("<h1>uploaded successfully<h1/>")
        }
    })
})


app.listen(port);
