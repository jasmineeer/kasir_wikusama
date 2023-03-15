const express = require(`express`)
const app = express()
app.use(express.json())

// Memanggil controller meja
let mejaController = require("../controllers/mejaController")
// Memanggil file middlewares
let authorization = require("../middlewares/authorization")

// Endpoint Get Meja
app.get("/", [authorization.authorization], mejaController.getMeja)

// Endpoint Add Meja
app.post("/", [authorization.authorization], mejaController.addMeja)

// Enpoint Update Meja
app.put("/:id_meja", [authorization.authorization], mejaController.updateMeja)

// Endpoint Delete Meja
app.delete("/:id_meja", [authorization.authorization], mejaController.deleteMeja)

module.exports = app 