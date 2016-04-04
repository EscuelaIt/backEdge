'use strict'
/**
 * Módulo de objetos.
 * @module objetos
 */

// las clases tiene sintaxis propia, ya no son funciones

/** Clase que representa a un polígono. */
let Poligono = class Poligono {
    /**
     * Constructor para crear un polígono.
     * @param {object} matematicas - Librería matemática de cálculo.
     * @param {string} nombre - Identificador del polígono.
     */
    constructor(matematicas, nombre) {
        this.matematicas = matematicas
        this.nombre = nombre
    }

    /**
     * Obtiene el nombre del polígono
     * @return {string} El nombre del polígono.
     */
    get miNombre() {
        return this.nombre
    }

    /**
    * Obtiene una descripcion humana del polígono
    * @return {string} La descripcion del polígono.
    */
    get descripcion() {
        return `Hola soy un ${this.nombre}`
    }
}

// La herencia se expresa con extends

/**
 * Clase que representa a un polígono rectángulo .
 * @extends Poligono
 */
let Rectangulo = class Rectangulo extends Poligono {
    /**
     * Crea un polígono rectángulo.
     * @param {object} matematicas - Librería matemática de cálculo.
     * @param {string} nombre - Identificador del polígono.
     * @param {number} base - Base del rectángulo.
     * @param {number} altura - Altura del rectángulo.
     */
    constructor(matematicas, nombre, base, altura) {
        // llamada al constructor padre
        super(matematicas, nombre)
        this.base = base
        this.altura = altura
    }
    /**
    * Obtiene el área del rectángulo
    * @return {string} el área del rectángulo.
    */
    get area() {
        return this.calcularArea()
    }

    // funciones privadas    
    calcularArea() {
        return this.base * this.altura
    }
    /**
    * Obtiene la diagonal del rectángulo
    * @return {number} la diagonal del rectángulo.
    */
    get diagonal() {
        return this.matematicas.diagonal(this.base, this.altura)
    }
}

/**
 * Clase que representa a un rectángulo cuadrado.
 * @extends Rectangulo
 */
class Cuadrado extends Rectangulo {
    /**
     * Crea un polígono rectángulo.
     * @param {object} matematicas - Librería matemática de cálculo.
     * @param {string} nombre - Identificador del polígono.
     * @param {number} [lado=10]  - Lado del cuadrado.
     */
    constructor(matematicas, nombre, lado) {
        // en node aún no se dispone de parámetros con valores por defecto
        lado = lado || 10
        super(matematicas, nombre, lado, lado) 
    }
}

module.exports = {
    /** Clase Polígono */
    Poligono: Poligono,
    /** Clase Rectángulo */
    Rectangulo: Rectangulo,
    /** Clase Cuadrado */
    Cuadrado: Cuadrado
}