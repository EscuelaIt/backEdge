'use strict'
const mongodb = require('./mongodb')
const colName = 'usuarios'

let sesiones = []

module.exports = {
    usarSeguridad: usarSeguridad,
    existeUsuario: existeUsuario,
    crearUsuario: crearUsuario,
    esUsuarioValido: esUsuarioValido,
    esSesionValida: esSesionValida,
    getSesion: getSesion,
    nuevaSesion: nuevaSesion
}

function usarSeguridad(app, ruta) {
    app.use(ruta, (req, res, next) => {
        let sessionId = req.get('sessionId')
        let sesion = getSesion(sessionId)
        if (sesion) {
            if (esSesionValida(sesion)) {
                sesion.timeStamp = new Date()
                req.usuario = sesion.email
                next()
            } else {
                console.log(`Sesión caducada: ${JSON.stringify(sesion)}`)
                res.status(419).send('Sesión caducada')
            }
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
    return mongodb.finding(colName, { email: usuario.email, password:usuario.password  })
}

function getSesion(sessionId) {
    return sesiones.filter(s => s.sessionId == sessionId)[0]
}

function esSesionValida(sesion) {
    return (new Date() - sesion.timeStamp) < 20 * 60 * 1000
}

function nuevaSesion(email) {
    let sessionId = Math.random() * (88888) + 11111
    let timeStamp = new Date()
    sesiones.push({
        sessionId: sessionId,
        email: email,
        timeStamp: timeStamp
    })
    return sessionId
}


