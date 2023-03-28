// import express
const express = require('express');
const app = express();
app.use(express.json());

// import model
const models = require('../models/index');
const transaksi = models.transaksi;
const detail_transaksi = models.detail_transaksi;

//import auth
const auth = require("../auth")
app.use(auth)

//Endpoint untuk menampilkan semua data transaksi
app.get("/", auth, async (req, res) =>{
    let result = await transaksi.findAll({
        include: [
            "customer",
            {
                model: models.detail_transaksi,
                as : "detail_transaksi",
                include: ["product"]    
            }
        ]
    })
    res.json({
        count: result.length,
        transaksi: result
    })
})

//get by id
app.get("/:customer_id", async (req, res) =>{
    let param = { customer_id: req.params.customer_id}
    let result = await transaksi.findAll({
        where: param,
        include: [
            "customer",
            {
                model: models.detail_transaksi,
                as : "detail_transaksi",
                include: ["product"]
            }
        ]
    })
    res.json(result)
})

//menambahkan data transaksi baru
app.post("/", async (req, res) =>{
    let current = new Date().toISOString().split('T')[0]
    let data = {
        id_customer: req.body.id_customer,
        id_admin: req.body.id_admin,
        id_outlet: req.body.outlet,
        tgl: current,
        batas_waktu: ""
    }
    transaksi.create(data)
    .then(result => {
        let lastID = result.transaksi_id
        detail = req.body.detail_transaksi
        detail.forEach(element => {
            element.transaksi_id = lastID
        });
        console.log(detail);
        detail_transaksi.bulkCreate(detail)
        .then(result => {
            res.json({
                message: "Data has been inserted"
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
    })
    .catch(error => {
        console.log(error.message);
    })
})

// delete transaksi
app.delete("/:transaksi_id", async (req, res) =>{
    let param = { transaksi_id: req.params.transaksi_id}
    try {
        await detail_transaksi.destroy({where: param})
        await transaksi.destroy({where: param})
        res.json({
            message : "data has been deleted"
        })
    } catch (error) {
        res.json({
            message: error
        })
    }
})

module.exports = app