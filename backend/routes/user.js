const express = require(`express`)
const app = express()
app.use(express.json())

// Memanggil controller user
let userController = require("../controllers/userController")
// Memanggil file middlewares
const authorization = require("../middlewares/authorization")

// Endpoint Get User
app.get("/", [authorization.authorization], userController.getUser)

// Endpoint Add User
app.post("/", [authorization.authorization], userController.addUser)

// Endpoint Find User
app.post("/search", [authorization.authorization], userController.findUser)

// Endpoint Authorization
app.post("/auth", userController.authentication)

// Endpoint Update User
app.put("/:id_user", [authorization.authorization], userController.updateUser)

// Endpoint Delete User
app.delete("/:id_user", [authorization.authorization], userController.deleteUser)

module.exports = app 