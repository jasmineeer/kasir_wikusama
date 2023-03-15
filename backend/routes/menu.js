const express = require(`express`)
const app = express()
app.use(express.json())

// Memanggil controller menu
let menuController = require("../controllers/menuController")
// Memanggil file middlewares
let uploadImage = require("../middlewares/uploadImage")
let authorization = require("../middlewares/authorization")

// Endpoint Get Menu
app.get("/", [authorization.authorization], menuController.getMenu)

// Endpoint Add Menu
app.post("/", [ uploadImage.upload.single(`gambar`), authorization.authorization], menuController.addMenu)

// Endpoint Update Menu
app.put("/:id_menu", [ uploadImage.upload.single(`gambar`), authorization.authorization], menuController.updateMenu)

// Endpoint Delete Menu
app.delete("/:id_menu", [authorization.authorization], menuController.deleteMenu)

module.exports = app 