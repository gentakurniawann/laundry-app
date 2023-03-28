const express = require("express");
const bodyParser = require("body-parser");
const md5 = require("md5");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const models = require("../models/index");
const admin = models.admin;

//import auth
const auth = require("../auth");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "login";

// endpoint login admin (authentication), METHOD: POST, function: findOne
app.post("/auth", async (req, res) => {
  let data = {
    username: req.body.username,
    password: md5(req.body.password),
  };
  // cari data admin yang username dan passwordnya sama dengan input
  let result = await admin.findOne({ where: data });
  // ditemukan
  if (result) {
    // set payload from data
    let payload = JSON.stringify(result);
    // generate token based on payload and secret_key
    let token = jwt.sign(payload, SECRET_KEY);
    res.json({
      logged: true,
      data: result,
      token: token,
    });
  }
  // tidak ditemukan
  else {
    res.json({
      logged: false,
      message: "Invalid username or password",
    });
  }
});

//endpoint ditulis disini
app.get("/", auth, (req, res) => {
   admin
    .findAll({include: "outlets"})
    .then((admin) => {
      res.json({
        count: admin.length,
        admin: admin,
      });
    })
    .catch((error) => {
      res.json({
        message: error.message,
      });
    });
});

app.get("/:id_admin", auth, (req, res) =>{
  admin.findAll({ 
    where: {id_admin: req.params.id_admin}, 
    include: "outlets"
  })
  .then(result => {
      res.json({
          count: result.length,
          admin: result
      })
  })
  .catch(error => {
      res.json({
          message: error.message
      })
  })
})

//endpoint unruk menyimpan data admin, Method POST, function create
app.post("/", auth, (req, res) => {
  let data = {
    id_outlet: req.body.id_outlet,
    name: req.body.name,
    username: req.body.username,
    password: md5(req.body.password),
    role: req.body.role,
  };
  admin
    .create(data)
    .then((result) => {
      res.json({
        message: "data has been inserted",
      });
    })
    .catch((error) => {
      res.json({
        message: error.message,
      });
    });
});

//endpoint untuk mengupdate data admin, METHOD: PUT, fuction: UPDATE
app.put("/:id", auth, (req, res) => {
  let param = {
    id_admin: req.params.id,
  };
  let data = {
    id_outlet: req.body.id_outlet,
    name: req.body.name,
    username: req.body.username,
    password: md5(req.body.password),
    role: req.body.role,
  };
  admin
    .update(data, { where: param })
    .then((result) => {
      res.json({
        message: "data has been updated",
      });
    })
    .catch((error) => {
      res.json({
        message: error.message,
      });
    });
});

//endpoint untuk menghapus data admin,METHOD: DELETE, function: destroy
app.delete("/:id", auth, async (req, res) => {
  let param = {
    id_admin: req.params.id,
  };
  admin
    .destroy({ where: param })
    .then((result) => {
      res.json({
        massege: "data has been deleted",
      });
    })
    .catch((error) => {
      res.json({
        message: "error.message",
      });
    });
});
module.exports = app;
