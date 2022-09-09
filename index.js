const express = require("express")
const multer = require('multer')
const cors = require('cors')
const mysql = require('mysql')
const { diskStorage } = require("multer")
const app = express()


let db=mysql.createConnection({
    host:'localhost',
    port:3306,
    user:'root',
    password:'Root',
    database:'crud'
})

db.connect((err)=>{
    if(err) throw err;
    console.log("it is work");
})

// app.use(express.static("./image"))
let upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "./image")
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + "-" + file.originalname)
        }
    })
})

app.post('/',upload.single('image'),(req,res)=>{
    console.log("work");
    db.query("insert into emp(name,email,password,emp_image,job) values('bharathi','bharathi@gmail.com','dasan',?,'developer')",
    [req.file.originalname],(err,result)=>{
        if(err) throw err;
        console.log(result);
    })


    console.log(req.file);
})

app.listen(3000,()=>{
    console.log('server is cost localhost 3000');
})