'use strict'
let movimientos = []
module.exports = (app, ruta) => {
    // Tendremos dos mega-rutas por recurso

    // una para ir a la colección
    app.route(ruta)
        .get(function(peticion, respuesta) {
            // filtro para el usuario actual
            var movimientosUsuario = movimientos.filter(function(m) {
                return m.usuario == peticion.usuario
            });
            if (movimientosUsuario && movimientosUsuario.length > 0)
                respuesta.json(movimientosUsuario);
            else
                respuesta.status(204).send()
        }).post(function(peticion, respuesta) {
            var nuevoMovimiento = peticion.body
            nuevoMovimiento.id = movimientos.length
            // firma del movimiento en el servidor
            nuevoMovimiento.usuario = peticion.usuario
            movimientos.push(nuevoMovimiento)
            respuesta.status(201).json(nuevoMovimiento)
        });

    // si la ruta es simple, se puede mantener el verbo original
    // Manteniendo la Precedencia
    app.get(ruta + '/saldos', function(peticion, respuesta) {
        var totales = {
            ingresos: 0,
            gastos: 0,
            balance: 0
        }
        if (movimientos && movimientos.length > 0) {
            movimientos.forEach(function(movimiento) {
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
            });
        }
    })

    // otra a nivel de elemento
    app.route(ruta + '/:id')
        .get(function(peticion, respuesta) {
            var movimientosUsuario = getMovimientoUsuario(peticion.params.id, peticion.usuario);
            if (movimientosUsuario && movimientosUsuario.length > 0)
                respuesta.json(movimientosUsuario[0])
            else
                respuesta.status(404).send();
        }).put(function(peticion, respuesta) {
            var movimientosUsuario = getMovimientoUsuario(peticion.params.id, peticion.usuario);
            if (movimientosUsuario && movimientosUsuario.length > 0) {
                movimientosUsuario[0] = peticion.body
                respuesta.json(1);
            } else {
                respuesta.status(404).send(0)
            }
        }).delete(function(peticion, respuesta) {
            var movimientosUsuario = getMovimientoUsuario(peticion.params.id, peticion.usuario);
            if (movimientosUsuario && movimientosUsuario.length > 0) {
                movimientos.splice(peticion.params.id, 1)
                respuesta.status(204).send(1)
            } else {
                respuesta.status(404).send(0)
            }
        })


    function getMovimientoUsuario(id, usuario) {
        return movimientos.filter(m => m.usuario == usuario && m.id == id)
    }


}
