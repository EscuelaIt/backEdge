'use strict'
let movimientos = []
module.exports = (app, rutaMovimientos, rutaSaldos) => {
    // Tendremos dos mega-rutas por recurso

    // una para ir a la colección
    // api/priv/movimientos
    app.route(rutaMovimientos)
        .get((peticion, respuesta) => {
            // filtro para el usuario actual
            let movimientosUsuario = movimientos.filter(m => m.usuario == peticion.usuario)
            if (movimientosUsuario && movimientosUsuario.length > 0)
                respuesta.json(movimientosUsuario)
            else
                respuesta.status(204).send()
        }).post((peticion, respuesta) => {
            let nuevoMovimiento = peticion.body
            nuevoMovimiento.id = movimientos.length
            // firma del movimiento en el servidor
            nuevoMovimiento.usuario = peticion.usuario
            movimientos.push(nuevoMovimiento)
            respuesta.status(201).json(nuevoMovimiento)
        })



    // otra a nivel de elemento
    // // api/priv/movimientos/159
    app.route(`${rutaMovimientos}/:id`)
        .get((peticion, respuesta) => {
            let movimientosUsuario = getMovimientoUsuario(peticion.params.id, peticion.usuario)
            if (movimientosUsuario && movimientosUsuario.length > 0)
                respuesta.json(movimientosUsuario[0])
            else
                respuesta.status(404).send()
        }).put((peticion, respuesta) => {
            let movimientosUsuario = getMovimientoUsuario(peticion.params.id, peticion.usuario)
            if (movimientosUsuario && movimientosUsuario.length > 0) {
                movimientosUsuario[0] = peticion.body
                respuesta.json(movimientosUsuario[0])
            } else {
                respuesta.status(404).send()
            }
        }).delete((peticion, respuesta) => {
            let movimientosUsuario = getMovimientoUsuario(peticion.params.id, peticion.usuario)
            if (movimientosUsuario && movimientosUsuario.length > 0) {
                movimientos.splice(peticion.params.id, 1)
                respuesta.status(204).send()
            } else {
                respuesta.status(404).send()
            }
        })

    // si la ruta es simple, se puede mantener el verbo original
    // Manteniendo la Precedencia
    // api/priv/saldos
    app.get(rutaSaldos, (peticion, respuesta) => {
        let totales = {
            ingresos: 0,
            gastos: 0,
            balance: 0
        }
        if (movimientos && movimientos.length > 0) {
            movimientos.forEach((movimiento) => {
                if (movimiento.usuario == peticion.usuario) {
                    if (movimiento.esIngreso) {
                        totales.ingresos += movimiento.importe
                    } else {
                        totales.gastos += movimiento.importe
                    }
                }
            })
            totales.balance = totales.ingresos - totales.gastos
            respuesta.json(totales)
        } else {
            respuesta.status(200).json({
                ingresos: 0,
                gastos: 0,
                balance: 0
            })
        }
    })

    function getMovimientoUsuario(id, usuario) {
        return movimientos.filter(m => m.usuario == usuario && m.id == id)
    }


}
