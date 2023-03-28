// import express
const express = require('express');
const app = express();
app.use(express.json());

// import model
const models = require('../models/index');
const outlet = models.outlet;

//import auth
const auth = require("../auth")
app.use(auth) //harus login untuk bisa akses endpoint

// endpoint untuk menampilkan semua data outlet
app.get("/", (req, res) =>{
    outlet.findAll()
        .then(result => {
            res.json({
                count: result.length,
                outlet: result
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })  
})

//get outlet by id
app.get("/:id_outlet", (req, res) =>{
    outlet.findOne({ where: {id_outlet: req.params.id_outlet}})
    .then(result => {
        res.json({
            outlet: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

//post outlet
app.post("/", (req, res) =>{
    let data = {
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone
    }
    outlet.create(data)
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
})

//update outlet
app.put("/:id", (req, res) =>{
    let param = { id_outlet: req.params.id}
    let data = {
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone
    }
    outlet.update(data, {where: param})
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

//delete outlet
app.delete("/:id", auth, async (req, res) =>{
    try {
        let param = { id_outlet: req.params.id}
        let result = await outlet.findOne({where: param})
        // delete data
        outlet.destroy({where: param})
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