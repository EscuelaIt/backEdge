'use strict'
/** pruebas con mocha */
const assert = require('assert')

/** librería que deseamos comprobar */
const tools = require('../tools')

describe('matemáticas', () => {
    describe('cuadrado', () => {
        it('should return 4 when the value is 2', () => assert.equal(4, tools.matematicas.cuadrado(2)))
        it('should return 9 when the value is 3', () => assert.equal(9, tools.matematicas.cuadrado(3)))
    })
    describe('diagonal', () => {
        it('should return 5 when the values are 3 and 4', () => assert.equal(5, tools.matematicas.diagonal(3, 4)))
    })
})

describe('cadenas', () => {
    describe('capitaliza', () => {
        it('should capitalize', () => assert.equal('Me voy a new york', tools.cadenas.capitaliza('me voy a New York')))
    })
})

describe('promesas', () => {
    describe('encadenadas', () => {
        it('should create a file', () => {
            const promesas = require('../promesas')
            return promesas.descargando('academia-binaria.com')
                .then(result => {
                    promesas.escribiendo('academia-binaria.com.html', result)
                        .then(result => assert.equal('Fichero Guardado !!!', result))
                })
        })
    })
})