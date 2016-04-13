'use strict'
const mongodb = require('./mongodb')
const colName = 'usuarios'
const jwt = require('./jwt')

module.exports = {
    usarSeguridad: usarSeguridad,
    existeUsuario: existeUsuario,
    crearUsuario: crearUsuario,
    esUsuarioValido: esUsuarioValido,
    nuevaSesion: (usuario) => jwt.generaToken(usuario)
}

function usarSeguridad(app, ruta) {
    app.use(ruta, (req, res, next) => {
        let sessionId = req.get('sessionId')
        let sesion = jwt.verify(sessionId)
        if (sesion) {
            sesion.timeStamp = new Date()
            req.usuario = sesion.email
            next()
        } else {
            res.status(401).send('Credencial inválida')
        }
    })
}


function existeUsuario(usuario) {
    return mongodb.finding(colName, { email: usuario.email })
}

function crearUsuario(usuario) {
    return mongodb.inserting(colName, usuario)
}

function esUsuarioValido(usuario) {
    return mongodb.finding(colName, { email: usuario.email, password: usuario.password })
}




