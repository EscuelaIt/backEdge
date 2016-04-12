'use strict'
let movimientos = []
const mongodb = require('./mongodb')
const colName = 'movimientos'

module.exports = (app, rutaMovimientos, rutaSaldos) => {
    // Tendremos dos mega-rutas por recurso
    let resError = (err, res) => {
        console.error(err)
        res.status(500).send(err)
    }
    // una para ir a la colección
    // api/priv/movimientos
    app.route(rutaMovimientos)
        .get((req, res) => {
            mongodb.finding(colName, { usuario: req.usuario })
                .then(result => result.length > 0 ? res.json(result) : res.status(204).send())
                .catch(err => resError(err, res))
        }).post((req, res) => {
            let nuevoMovimiento = req.body
            nuevoMovimiento.usuario = req.usuario
            mongodb.inserting(colName, nuevoMovimiento)
                .then(result => res.status(201).json(result.ops[0]))
                .catch(err => resError(err, res))
        })



    // otra a nivel de elemento
    // // api/priv/movimientos/159
    app.route(`${rutaMovimientos}/:id`)
        .get((req, res) => {
            mongodb.finding(colName, { usuario: req.usuario }, req.params.id)
                .then(result => result.length>0 ? res.json(result) : res.status(404).send())
                .catch(err => resError(err, res))
        }).put((req, res) => {
            mongodb.updating(colName, { usuario: req.usuario }, req.params.id, req.body)
                .then(result => result.result.n > 0 ? res.status(200).json(result) : res.status(404).send() )
                .catch(err => resError(err, res))

        }).delete((req, res) => {
            mongodb.deleting(colName, { usuario: req.usuario }, req.params.id)
                .then(result => res.status(204).json(result))
                .catch(err => resError(err, res))
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
