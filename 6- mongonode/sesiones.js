'use strict'
const seguridad = require('./seguridad.js')
module.exports = (app, ruta) => {
    // Gestión de sesiones: listado y login
    app.route(ruta)
        .post((req, res) => {
            let sesion = req.body
            if (seguridad.esUsuarioValido(sesion)) {
                console.log(`aceptado: ${sesion.email}`)
                let nuevoSessionId = seguridad.nuevaSesion(sesion.email)
                res.status(201).json(nuevoSessionId)
            } else {
                console.log(`Credencial inválida: ${sesion.email}`)
                res.status(401).send('Credencial inválida')
                res.send()
            }
        })

}
