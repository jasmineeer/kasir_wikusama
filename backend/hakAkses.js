const deniedMessage = {
    message: "Access Denied",
    error: null 
}

const admin = async (request) => {
    const role = request.dataUser.role
    console.log(role)

    if (role !== "admin") {
        return ({
            status: false,
            message: deniedMessage
        })
    }

    return ({
        status: true,
        message: "Granted"
    })
}

const adminCashier = async (request) => {
    const role = request.dataUser.role 
    console.log(role)

    if (role === "admin" || role === "kasir") {
        return ({
            status: true,
            message: "Granted"
        })
    }

    return ({
        status: false,
        message: deniedMessage
    })
}

const cashierManager = async (request) => {
    const role = request.dataUser.role 
    console.log(role)

    if (role === "manajer" || role === "kasir") {
        return ({
            status: true,
            message: "Granted"
        })
    }

    return ({
        status: false,
        message: deniedMessage
    })
}

const cashier = async (request) => {
    const role = request.userData.role
    console.log(role)

    if (role === "kasir") {
        return ({
            status: true, 
            message: "Granted"
        })
    } else{
        return ({
            status: false,
            message: deniedMessage
        })
    }
}

const manager = async (request) => {
    const role = request.dataUser.role 
    console.log(role)

    if (role === manajer) {
        return ({
            status: true,
            message: "Granted"
        })
    } else{
        return ({
            status: false,
            message: deniedMessage
        })
    }
}

module.exports = {
    admin,
    adminCashier,
    cashier,
    manager,
    cashierManager 
}