'use strict'
const http = require('http')
const fs = require('fs')

// nombrar en gerundio los métodos asíncronos ayuda a destacar su naturaleza diferida

module.exports = {
    /** Te promete que descargará algo*/
    descargando: descargando,
    /** Te promete que escribirá algo */
    escribiendo: escribiendo
}

/**
 * @param {string} ruta - ruta desde la que se descargará.
 * @return Una promesa
 */
function descargando(ruta) {
    // una promesa se construye con una función ejecutora

    /**
     * Ejecutor que realiza la operación asíncrona
     * @param {object} resolve - Función que resuelve la promesa devolviendo un valor.
     * @param {object} reject - Función que rechaza la promesa devolviendo una razón.
     */
    let descargador = (resolve, reject) => {
        http
            .get({ host: ruta }, res => resolve(res))
            .on('error', error => reject(error))
    }

    // se retorna la promesa    
    return new Promise(descargador)
}

/**
 * @param {string} fichero - nombre del fichero dónde se guardará.
 * @param {string} contenido - contenido que se guardará en el fichero.
 * @return Una promesa
 */
function escribiendo(fichero, contenido) {
    let ruta = `${__dirname}/${fichero}`
    let escritor = (resolve, reject) => {
        fs.writeFile(ruta, contenido, err => {
            // el resto del código no tiene que tratar con algo tan feo...
            if (err) {
                reject('Ocurrió un problema')
            } else {
                resolve('Fichero Guardado !!!')
            }
        })
    }
    return new Promise(escritor)
}