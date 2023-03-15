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

// exports.findUser = async (request, response) => {
//     let keyword = request.body.keyword 

//     /** import sequelize operator */
//     let sequelize = require(`sequelize`)
//     let Op = sequelize.Op 
//     /**
//      * query = select * from user where username like "%keyword%" or
//      * nama_user like "%keyword%"
//      */

//     let dataUser = await userModel.findAll({
//         where: {
//             [Op.or] : {
//                 username: { [Op.like] : `%${keyword}%`},
//                 nama_user: { [Op.like] : `%${keyword}%`},
//                 role: { [Op.like] : `%${keyword}%`}
//             }
//         }
//     })
//     return response.json(dataUser)
// }

exports.findUser = async (request, response) => {
    let keyword = request.body.keyword 
    let sequelize = require(`sequelize`)
    let Op = sequelize.Op 

    let data = await userModel.findAll({
        where: {
            [Op.or] : {
                // username: { [Op.like] : `%${keyword}%` },
                nama_user: { [Op.like] : `%${keyword}%` },
                username: { [Op.like] : `%${keyword}%` },
                role: { [Op.like] : `%${keyword}%` }
            }
        }
    })
    return response.json(data)
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

exports.authentication = async (request, response) => {
    let dataUser = {
        username: request.body.username,
        password: md5(request.body.password)
    }
    let result = await userModel.findOne({ where: dataUser})

    if (result) {
        let payload = JSON.stringify(result)
        let secretKey = `Cafe Wikusama`
        let token = jwt.sign(payload, secretKey)
        return response.json({
            logged: true,
            token: token,
            dataUser: result
        })
    } else{
        return response.json({
            logged: false,
            message: `Invalid username or password`
        })
    }
}