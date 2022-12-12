const express = require('express');
const cors =require('cors');
const dotenv=require('dotenv');
const fs= require("fs");
//dotenv setup
dotenv.config();
//actual app 
const app=express();
app.use(cors());
app.use(express.json());

app.get("/", function (req, res) {
    res.send("<br> to create use /createfile <br>" + "to read use /readfile");
  });
  
  app.get("/createfile", (req, res) => {
    const { time, file } = TimeStamp();
    console.log(time, file);
    fs.writeFile(`./folder/${file}.txt`, time, (err) => {
      if (err) console.log(err);
      else console.log("file created successfully");
    });
    res.send("file created successfully");
  });
  
  app.get("/readfile", (req, res) => {
    fs.readdir("./folder/", (err, files) => {
      if (files.length == 0) {
        res.send("no files in directory");
      } else {
        let filelist = "files in directory <br>";
        files.forEach((file) => {
          filelist += file + "<br>";
        });
        res.send(filelist);
      }
    });
  });
  

  
  function TimeStamp() {
    var d = Date.now();
    var date = new Date(d);
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    var hrs = date.getHours();
    var mins = date.getMinutes();
    var secs = date.getSeconds();
    var time = hrs + ":" + mins + ":" + secs;
    var file =
      day + "-" + month + "-" + year + "_" + hrs + "_" + mins + "_" + secs;
  
    return { time, file };
  }
app.listen(process.env.PORT);