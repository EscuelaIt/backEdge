'use strict'
let usuarios = []
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
                // Sintaxis mejorada de envío de códigos de estado http
                res.status(419).send('Sesión caducada')
            }
        } else {
            res.status(401).send('Credencial inválida')
        }
    })
}


function existeUsuario(usuario) {
    return usuarios.some(u => u.email == usuario.email)
}

function crearUsuario(usuario) {
    usuarios.push(usuario)
}

function esUsuarioValido(usuario) {
    return usuarios.filter(u => u.email == usuario.email && u.password == usuario.password)[0]
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


