'use strict'
/**
 * Módulo para tratar Cadenas.
 * @module cadenas
 */

module.exports = {
    // si la función se resuleve en una linea, puede declararse y exportarse así:
    /** Pone en mayúscula la primera letra de un texto 
    * @param {string} cadena - el texto original.
    * @return el texto, con la inicial en mayúscula y el resto minúscula 
    */
    capitaliza: cadena => `${cadena[0].toUpperCase()}${cadena.slice(1).toLowerCase()}`
}