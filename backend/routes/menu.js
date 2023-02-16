const express = require(`express`)
const app = express()
app.use(express.json())

// Memanggil controller menu
let menuController = require("../controllers/menuController")
// Memanggil file middlewares
let uploadImage = require("../middlewares/uploadImage")

// Endpoint Get Menu
app.get("/", menuController.getMenu)

// Endpoint Add Menu
app.post("/", uploadImage.upload.single(`gambar`), menuController.addMenu)

// Endpoint Update Menu
app.put("/:id_menu", uploadImage.upload.single(`gambar`), menuController.updateMenu)

// Endpoint Delete Menu
app.delete("/:id_menu", menuController.deleteMenu)

module.exports = app 