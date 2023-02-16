let jwt = require("jsonwebtoken")

exports.authorization = (request, response, next) => {
    // Token dikirimkan melalui header 
    let header = request.headers.authorization 
    let token = header &&.split(" ")[1]

    // Apabila token tidak diisi, maka akan muncul pesan unauthorized
    if (token == null) {
        return response.json({
            message: `Unauthorized`
        })
    } else{
        // Kalimat yang akan diubah menjadi token
        let secretKey = `Cafe Wikusama`

        // Memverifikasi token yang diisikan oleh user
        jwt.verify(token, secretKey, (error, user) => {
            // Apabila token yang diisikan salah, akan muncul pesan invalid
            if (error) {
                return response.json({
                    message: `Invalid token`
                })
            } else{
                // Apabila token yang diisikan benar, user dapat lanjut mengakses data cafe
                next()
            }
        })
    }
}