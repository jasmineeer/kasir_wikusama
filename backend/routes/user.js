const express = require(`express`)
const app = express()
app.use(express.json())

// Memanggil controller user
let userController = require("../controllers/userController")
// Memanggil file middlewares

// Endpoint Get User
app.get("/", userController.getUser)

// Endpoint Add User
app.post("/", userController.addUser)

// Endpoint Update User
app.put("/:id_user", userController.updateUser)

// Endpoint Delete User
app.delete("/:id_user", userController.deleteUser)

module.exports = app 