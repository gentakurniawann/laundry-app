// import express
const express = require('express');
const app = express();
app.use(express.json());

// import md5
const md5 =require('md5');

// import multer
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// import model
const models = require('../models/index');
const customer = models.customer;

//config storage image
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./image/customer")
    },
    filename:(req,file,cb)=>{
        cb(null, "img-"+Date.now()+path.extname(file.originalname))
    }
});
let upload = multer({storage: storage})

//import auth
const auth = require("../auth")
const jwt = require("jsonwebtoken")
const SECRET_KEY = "login"

// endpoint login customer (authentication), METHOD: POST, function: findOne
app.post("/auth", async (req,res) => {
    let data= {
        username: req.body.username,
        password: md5(req.body.password)
    }
    // cari data admin yang username dan passwordnya sama dengan input
    let result = await customer.findOne({where: data})
    // ditemukan
    if(result){
        // set payload from data
        let payload = JSON.stringify(result)
        // generate token based on payload and secret_key
        let token = jwt.sign(payload, SECRET_KEY)
        res.json({
            logged: true,
            data: result,
            token: token
        })
    }
    // tidak ditemukan
    else{
        res.json({
            logged: false,
            message: "Invalid username or password"
        })
    }
})

// endpoint untuk menampilkan semua data customer
app.get("/", auth, (req, res) =>{
    customer.findAll()
        .then(result => {
            res.json({
                count: result.length,
                customer: result
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })  
})

//get customer by id
app.get("/:id_customer", auth, (req, res) =>{
    customer.findOne({ where: {id_customer: req.params.id_customer}})
    .then(result => {
        res.json({
            customer: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

//post customer
app.post("/", upload.single("image"), auth, (req, res) =>{
    if (!req.file) {
        res.json({
            message: "No uploaded file"
        })
    } else {
        let data = {
            name: req.body.name,
            phone: req.body.phone,
            address: req.body.address,
            image: req.file.filename,
            jenis_kelamin: req.body.jenis_kelamin,
            username: req.body.username,
            password: md5(req.body.password)
        }
        customer.create(data)
        .then(result => {
            res.json({
                message: "data has been inserted"
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
    }
})

//update customer 
app.put("/:id", upload.single("image"), auth, (req, res) =>{
    let param = { id_customer: req.params.id}
    let data = {
        name: req.body.name,
        phone: req.body.phone,
        address: req.body.address,
        jenis_kelamin: req.body.jenis_kelamin,
        username: req.body.username
    }
    if (req.file) {
        // get data by id
        const row = customer.findOne({where: param})
        .then(result => {
            let oldFileName = result.image
           
            // delete old file
            let dir = path.join(__dirname,"../image/customer",oldFileName)
            fs.unlink(dir, err => console.log(err))
        })
        .catch(error => {
            console.log(error.message);
        })
 
        // set new filename
        data.image = req.file.filename
    }
 
    if(req.body.password){
        data.password = md5(req.body.password)
    }
 
    customer.update(data, {where: param})
        .then(result => {
            res.json({
                message: "data has been updated",
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

//delete customer
app.delete("/:id",auth, async (req, res) =>{
    try {
        let param = { id_customer: req.params.id}
        let result = await customer.findOne({where: param})
        let oldFileName = result.image
           
        // delete old file
        let dir = path.join(__dirname,"../image/customer",oldFileName)
        fs.unlink(dir, err => console.log(err))
 
        // delete data
        customer.destroy({where: param})
        .then(result => {
           
            res.json({
                message: "data has been deleted",
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
 
    } catch (error) {
        res.json({
            message: error.message
        })
    }
})

module.exports = app;
