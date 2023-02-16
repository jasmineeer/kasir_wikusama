const express = require(`express`)
const app = express()
app.use(express.json())

// Memanggil controller meja
let mejaController = require("../controllers/mejaController")
// Memanggil file middlewares


// Endpoint Get Meja
app.get("/", mejaController.getMeja)

// Endpoint Add Meja
app.post("/", mejaController.addMeja)

// Enpoint Update Meja
app.put("/:id_meja", mejaController.updateMeja)

// Endpoint Delete Meja
app.delete("/:id_meja", mejaController.deleteMeja)

module.exports = app 