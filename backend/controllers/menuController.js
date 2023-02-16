const fs = require("fs")
const path = require("path")

// Memanggil file model untuk menu
let menuModel = require("../models/index").menu 

exports.getMenu = (request, response) => {
    menuModel.findAll()
    
    .then(result => {
        return response.json(result)
    })
    .catch(error => {
        return response.json({
            message: error.message 
        })
    })
}

exports.addMenu = (request, response) => {
    if (!request.file) {
        return response.json({
            message: `No file uploaded`
        })
    }

    // Menampung data menu
    let newMenu = {
        nama_menu: request.body.nama_menu,
        jenis: request.body.jenis,
        deskripsi: request.body.deskripsi,
        gambar: request.file.filename,
        harga: request.body.harga 
    }

    menuModel.create(newMenu)
    .then(result => {
        return response.json({
            message: `Data Menu successfully inserted`
        })
    })
    .catch(error => {
        return response.json({
            message: error.message 
        })
    })
}

exports.updateMenu = async (request, response) => {
    let id = request.params.id_menu
    let dataMenu = {
        nama_menu: request.body.nama_menu,
        jenis: request.body.jenis,
        deskripsi: request.body.deskripsi,
        harga: request.body.harga 
    }

    if (request.file) {
        let menu = await menuModel.findOne({
            where: {
                id_menu: id 
            }
        })

        let oldFileName = menu.gambar 

        // Menghapus file
        let location = path.join(__dirname, "../image", oldFileName)
        fs.unlink(location, error => console.log())

        // Memberi nama file baru 
        dataMenu.gambar = request.file.filename 
    }

    menuModel.update(dataMenu, {
        where: {
            id_menu: id 
        }
    })

    .then(result => {
        return response.json({
            message: `Data Menu successfully updated`
        })
    })
    .catch(error => {
        return response.json({
            message: error.message 
        })
    })
}

exports.deleteMenu = async (request, response) => {
    let id = request.params.id_menu 

    // Mnegambil filename yang akan dihapus
    let menu = await menuModel.findOne({
        where: {
            id_menu: id 
        }
    })

    if (menu) {
        let oldFileName = menu.gambar 

        // Menghapus file
        let location = path.join(__dirname, "../image", oldFileName)
        fs.unlink(location, error => console.log())
    }

    menuModel.destroy({
        where: {
            id_menu: id 
        }
    })

    .then(result => {
        return response.json({
            message: `Data Menu successfully deleted`
        })
    })
    .catch(error => {
        return response.json({
            message: error.message 
        })
    })
}