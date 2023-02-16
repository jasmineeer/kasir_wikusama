const multer = require("multer")
const path = require("path")
const fs = require("fs")
const storage = multer.diskStorage({
    // Menentukan folder penyimpanan file image yang akan diupload 
    destination: (request, file, callback) => {
        callback(null, "./image")
    },
    // Menentukan nama file yang akan diupload 
    filename: (request, file, callback) => {
        callback(null, `image-${Date.now()}${path.extname(file.originalname)}`)
    }
})

exports.upload = multer({storage: storage})