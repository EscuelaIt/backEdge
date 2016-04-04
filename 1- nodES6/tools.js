'use strict'
/**
 * Módulo de herramientas.
 * @module tools
 */

// para no arrastrar las rutas a mútiples ficheros 
// conviene agruparlo en uno que los referencia a todos

const matematicas = require('./matematicas')


module.exports = {
    /** Módulo de matemáticas */
    matematicas: matematicas,
    /** Módulo de cadenas */
    cadenas: require('./cadenas')
}

