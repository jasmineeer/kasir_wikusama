const meja = require("../models/meja").meja

// Memanggil file model untuk meja
let mejaModel = require("../models/index").meja 

exports.getMeja = (request, response) => {
    mejaModel.findAll()
    .then(result => {
        return response.json(result)
    })
    .catch(error => {
        return response.json({
            message: error.message 
        })
    })
}

exports.addMeja = (request, response) => {
    // Menampung data meja
    let newMeja = {
        nomor_meja: request.body.nomor_meja 
    }

    mejaModel.create(newMeja)
    .then(result => {
        return response.json({
            message: `Data Meja successfully inserted`
        })
    })
    .catch(error => {
        return response.json({
            message: error.message 
        })
    })
}

exports.updateMeja = (request, response) => {
    let id = request.params.id_meja
    let dataMeja = {
        nomor_meja: request.body.nomor_meja 
    }

    mejaModel.update(dataMeja, {
        where: {
            id_meja: id 
        }
    })

    .then(result => {
        return response.json({
            message: `Data Meja successfully updated`
        })
    })
    .catch(error => {
        return response.json({
            message: error.message 
        })
    })
}

exports.deleteMeja = (request, response) => {
    let id = request.params.id_meja 

    mejaModel.destroy({
        where: {
            id_meja: id 
        }
    })

    .then(result => {
        return response.json({
            message: `Data Meja successfully deleted`
        })
    })
    .catch(error => {
        return response.json({
            message: error.message 
        })
    })
}