// Memanggil file model
let userModel = require("../models/index").user
let mejaModel = require("../models/index").meja 
let menuModel = require("../models/index").menu
let transaksiModel = require("../models/index").transaksi 
let detailTransaksiModel = require("../models/index").detail_transaksi

exports.getTransaksi = async (request, response) => {
    let dataTransaksi = await transaksiModel.findAll({
        include: ["user", "meja", {
            model: detailTransaksiModel,
            as: "detail_transaksi",
            include: ["menu"]
        }]
    })
    return response.json(dataTransaksi)
}

exports.addTransaksi = async (request, response) => {
    // Mendefinisikan menu
    let detail = request.body.detail_transaksi
    for (let i = 0; i < detail.length; i++) {
        let menu = await menuModel.findOne({
            where: {
                id_menu: detail[i].id_menu 
            }
        })
        let hargaMenu = menu.harga
        detail[i].harga = hargaMenu
    }

    let total = hargaMenu 
    let jumlah = detail_transaksi.qty
    let subtotal = hargaMenu*jumlah

    let newData = {
        tgl_transaksi: request.body.tgl_transaksi,
        id_user: request.body.id_user,
        id_meja: request.body.id_meja,
        nama_pelanggan: request.body.nama_pelanggan,
        status: request.body.status, 
        subtotal: subtotal
    }

    transaksiModel.create(newData)
    .then(result => {
        let detail_transaksi = request.body.detail_transaksi 

        // kita asumsikan detail_transaksi bertipe array
        let id = result.id_transaksi 
        for (let i = 0; i < detail_transaksi.length; i++) {
            detail_transaksi[i].id_transaksi = id 
        }

        // Memasukkan ke tabel detail_transaksi
        detailTransaksiModel.bulkCreate(detail_transaksi)
        .then(result => {
            return response.json({
                message: `Data Transaksi successfully inserted`
            })
        })
        .catch(error => {
            return response.json({
                message: error.message 
            })
        })
    })
    .catch(error => {
        return response.json({
            message: error.message 
        })
    })
}

exports.updateTransaksi = async (request, response) => {
    let id = request.params.id_transaksi 

    // mendefinisikan data yang akan diubah di tabel transaksi
    let data = {
        tgl_transaksi: request.body.tgl_transaksi,
        id_user: request.body.id_user,
        id_meja: request.body.id_meja,
        nama_pelanggan: request.body.nama_pelanggan,
        status: request.body.status
    }

    // Mengeksekusi update ke tabel transaksi
    transaksiModel.update(data, {
        where: {
            id_transaksi: id 
        }
    })

    .then(async (result) => {
        // Menghapus data detail berdasarkan id_transaksi yang akan diupdate
        await detailTransaksiModel.destroy({
            where: {
                id_transaksi: request.params.id_transaksi 
            }
        })

        // Memasukkan kembali data detail terbaru 
        let detail_transaksi = request.body.detail_transaksi 
        let id = request.params.id_transaksi 
        for (let i = 0; i < detail_transaksi.length; i++) {
            detail_transaksi[i].id_transaksi = id 
        }

        // Memasukkan data ke tabel detail_transaksi
        detailTransaksiModel.bulkCreate(detail_transaksi)
        .then(result => {
            return response.json({
                message: `Data Transaksi successfully updated`
            })
        }) 
        .catch(error => {
            return response.json({
                message: error.message 
            })
        })
    })
    .catch(error => console.log(error))
}

exports.deleteTransaksi = (request, response) => {
    let id = request.params.id_transaksi 

    detailTransaksiModel.destroy({
        where: {
            id_transaksi: id 
        }
    })

    .then(result => {
        let id = request.params.id_transaksi 
        transaksiModel.destroy({
            where: {
                id_transaksi: id 
            }
        })

        .then(result => {
            return response.json({
                message: `Data Transaksi successfully deleted`
            })
        })
        .catch(error => {
            return response.json({
                message: error.message 
            })
        })
    })
    .catch(error => console.log(error))
}