'use strict'
const seguridad = require('./seguridad.js')
module.exports = (app, ruta) => {
    // Gestión de sesiones: listado y login
    app.route(ruta)
        .post((req, res) => {
            let usuario = req.body
            if (seguridad.existeUsuario(usuario)) {
                console.log(`email ya registrado: ${usuario.email}`)
                res.status(409).send(`email ${usuario.email} ya registrado`)
            } else {
                console.log(`ok registrado: ${usuario.email}`)
                seguridad.crearUsuario(usuario)
                let nuevoSessionId = seguridad.nuevaSesion(usuario.email)
                res.status(201).json(nuevoSessionId)
            }
        })
}
