const express = require('express');
const cors  = require('cors');

const app = express();
app.use(cors());

//import endpoint diletakkan disini
const admin = require('./routes/admin')
app.use('/admin', admin)

//endpoint customer
const customer = require('./routes/customer');
app.use("/customer", customer)

//endpoint paket
const paket = require('./routes/paket');
app.use("/paket", paket)

//endpoint outlet
const outlet = require('./routes/outlet');
app.use("/outlet", outlet)

// //endpoint transaksi
// const transaksi = require('./routes/transaksi');
// app.use("/transaksi", transaksi)

app.listen(8000, () => {
    console.log("server run on port 8000");
})

app.use(express.static(__dirname))