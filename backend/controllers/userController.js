const md5 = require("md5")
const jwt = require(`jsonwebtoken`)
const { validationResult } = require(`express-validator`)

// Memanggil file model user
let userModel = require("../models/index").user 

exports.getUser = (request, response) => {
    // Menemukan seluruh data user
    userModel.findAll()

    // Apabila berhasil, akan menampilkan seluruh data user
    .then(result => {
        return response.json(result)
    })
    // Apabila gagal akan menampilkan pesan error
    .catch(error => {
        return response.json({
            message: error.message 
        })
    })
}

exports.addUser = (request, response) => {
    // Menampung seluruh data user yang diisikan 
    let newUser = {
        nama_user: request.body.nama_user,
        role: request.body.role,
        username: request.body.username,
        password: md5(request.body.password)
    }

    // Membuat data user
    userModel.create(newUser)
    .then(result => {
        return response.json({
            message: `Data User successfully inserted`
        })
    })
    .catch(error => {
        return response.json({
            message: error.message 
        })
    }) 
}

exports.updateUser = (request, response) => {
    let id = request.params.id_user 
    let dataUser = {
        nama_user: request.body.nama_user,
        role: request.body.role,
        username: request.body.username,
        password: md5(request.body.password)
    }

    // Mengupdate data user yang telah masuk berdasarkan id yang dimasukkan
    userModel.update(dataUser, {
        where: {
            id_user: id 
        }
    })

    .then(result => {
        return response.json({
            message: `Data User successfully updated`
        })
    }) 
    .catch(error => {
        return response.json({
            message: error.message
        })
    })
}

exports.deleteUser = (request, response) => {
    let id = request.params.id_user 

    // Menghapus data user berdasarkan id user yang dimasukkan
    userModel.destroy({
        where: {
            id_user: id 
        }
    })

    .then(result => {
        return response.json({
            message: `Data User successfully deleted`
        })
    })
    .catch(error => {
        return response.json({
            message: error.message 
        })
    })
}