const express = require(`express`)
const app = express()
app.use(express.json())

// Memanggil controller transaksi
let transaksiController = require("../controllers/transaksiController")
// Memanggil file middlewares


// Endpoint Get Transaksi
app.get("/", transaksiController.getTransaksi)

// Endpoint Add Transaksi
app.post("/", transaksiController.addTransaksi)

// Endpoint Update Transaksi
app.put("/:id_transaksi", transaksiController.updateTransaksi)

// Endpoint Delete Transaksi
app.delete("/:id_transaksi", transaksiController.deleteTransaksi)

module.exports = app 