// import express
const express = require('express');
const app = express();
app.use(express.json());

// import model
const models = require('../models/index');
const paket = models.paket;

// import auth
const auth = require("../auth")
app.use(auth) //harus login untuk bisa akses endpoint

// endpoint untuk menampilkan semua data paket
app.get("/", auth, (req, res) =>{
    paket.findAll()
        .then(result => {
            res.json({
                count: result.length,
                paket: result
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })  
})

//get paket by id
app.get("/:id_paket", auth, (req, res) =>{
    paket.findOne({ where: {id_paket: req.params.id_paket}})
    .then(result => {
        res.json({
            paket: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

//post paket
app.post("/", auth, (req, res) => {
    let data = {
        id_outlet: req.body.id_outlet,
        jenis: req.body.jenis,
        satuan: req.body.satuan,
        price: req.body.price
    }
    paket.create(data)
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

//update paket
app.put("/:id", auth, (req, res) =>{
    let param = { id_paket: req.params.id}
    let data = {
        id_outlet: req.body.id_outlet,
        jenis: req.body.jenis,
        satuan: req.body.satuan,
        price: req.body.price
    }
    paket.update(data, {where: param})
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

//delete paket
app.delete("/:id", auth, async (req, res) =>{
    try {
        let param = { id_paket: req.params.id}
        let result = await product.findOne({where: param})
        // delete data
        paket.destroy({where: param})
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