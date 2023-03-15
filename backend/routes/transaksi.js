const express = require(`express`)
const app = express()
app.use(express.json())

// Memanggil controller transaksi
let transaksiController = require("../controllers/transaksiController")
// Memanggil file middlewares
const authorization = require("../middlewares/authorization")

// Endpoint Get Transaksi
app.get("/", [authorization.authorization], transaksiController.getTransaksi)

// Endpoint Get Transaksi by Id_Transaksi
app.get("/:id_transaksi", [authorization.authorization], transaksiController.getTransaksiById)

// Endpoint Add Transaksi
app.post("/", [authorization.authorization], transaksiController.addTransaksi)

// Endpoint Search Transaksi
app.post("/search", [authorization.authorization], transaksiController.findTransaksi)

// Endpoint Update Transaksi
app.put("/:id_transaksi", [authorization.authorization], transaksiController.updateTransaksi)

// Endpoint Delete Transaksi
app.delete("/:id_transaksi", [authorization.authorization], transaksiController.deleteTransaksi)

module.exports = app 