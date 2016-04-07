'use strict'

// declaración de constantes para referencias que no van a cambiar

const tools = require('./tools')

const matematicas = tools.matematicas
/** Calcula el cuadrado de un número */
const cuadrado = matematicas.cuadrado
const diagonal = matematicas.diagonal
const capitaliza = tools.cadenas.capitaliza

/** base en centímetros del rectángulo */
const base = 11
const altura = 15

// declaración de variables con let 

let cuadradoDeBase = cuadrado(base)

// interpolación de template strings con expresiones

console.log(capitaliza(`el cuadrado de ${base} es ${cuadradoDeBase}`))
console.log(capitaliza(`LA Diagonal de ${base} y ${altura} es ${diagonal(base, altura)}`))


// objetos con clase

const objetos = require('./objetos')

let miPoligono = new objetos.Poligono(matematicas, 'Polígono cualquiera')
console.log(miPoligono.descripcion)

let miFinca = new objetos.Rectangulo(matematicas, 'Mi finca', base, altura)
console.log(`La diagonal de ${miFinca.miNombre} mide ${miFinca.diagonal} m. y tiene un área de ${miFinca.area} m2`)

let miCuadrado = new objetos.Cuadrado(matematicas, 'Cuadrado Estándar')
console.log(`La diagonal de ${miCuadrado.miNombre} mide ${miCuadrado.diagonal} m. y tiene un área de ${miCuadrado.area} m2`)

let otroCuadrado = new objetos.Cuadrado(matematicas, 'un cuadrado especial', 3.14)
console.log(`La diagonal de ${otroCuadrado.miNombre} mide ${otroCuadrado.diagonal} m. y tiene un área de ${otroCuadrado.area} m2`)


// promesas
// son objetos con dos métodos a los que enganchar 'callbacks'

const promesas = require('./promesas')

// las llamadas a métodos asíncronos devuelven promesas
promesas.descargando('agorabinaria.com')
    .then(result => {
        // función que se ejecutará si todo va bien
        console.log(`Todo bien ${result.statusCode}`)
        promesas.escribiendo('agorabinaria.com.html', result)
            .then(result => console.log(`Todo bien ${result}`))
            .catch(reason => console.error(reason))
    })
    .catch(reason => console.error(reason))

// el código queda más legible que con los callbacks
promesas.descargando('unrutaquenoexiste.es')
    .then(result => console.log(`Todo bien ${result.statusCode}`))
    .catch(reason => console.error(reason))


// El Proceso
process.title = 'mi super aplicación back edge'

//en node todo ocurre en paralelo excepto tu código

imprimir()

// Puedes conocer cosas acerca del proceso en curso
function imprimir() {
    console.log('----------------------------------------')
    console.log('   DATOS DE NODE.JS PROCESS')
    console.log('----------------------------------------')
    console.log('Directorio .......... ' + process.cwd())
    console.log('Exec path ........... ' + process.execPath)
    //console.log('identificador uid ... ' + process.getuid())
    console.log('identificador pid ... ' + process.pid)
    console.log('Título .............. ' + process.title)
    console.log('Versión de Node  .... ' + process.version)
    console.log('Plataforma........... ' + process.platform)
}

// tests
// npm install mocha -g 
// mocha