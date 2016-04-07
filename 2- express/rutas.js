module.exports = (app) => {
    const matematicas = require('./matematicas')
    // La peticiones suelen enviar parámetros
    // se declaran precedidos de :
    app.get('/saludame/:nombre', function(peticion, respuesta) {
        // se recuperan en la coleccción params de la petición
        respuesta.send('Hola ' + peticion.params.nombre)
    })

    app.get('/sayhello/:name', (req, res) => res.send(`Hello ${req.params.name}`) )    

    // Las expresiones de las rutas puede ser complejas
    // Express determinará la función que mejor encaja con una ruta determinada
    // Se pueden usar restricciones para 'validar los parámetros'
    app.get('/mates/:operacion/:numero1/:numero2([0-9])', (peticion, respuesta) => {
        const operacion = peticion.params.operacion
        const numero1 = peticion.params.numero1
        const numero2 = peticion.params.numero2
        var resultado = 'Desconocido'
        if ('sumar' === operacion) {
            resultado = matematicas.sumar(numero1, numero2)
        } else if ('restar' === operacion) {
            resultado = matematicas.restar(numero1, numero2)
        }
        respuesta.send(`El resultado de ${operacion} ${numero1} y ${numero2} es ${resultado}`)
    })

    // Además de las espresiones de rutas, tambien podemos ejecutar acciones específicas con un parámatro
    // Este es un buen sitio para sanear la entrada
    app.param('numero1', (peticion, respuesta, siguiente, valor) => {
        console.log(`numero1 vale  ${valor}`)
        if (isNaN(valor)) {
            console.log('numero1 no es un número !!!! ')
            // podemos hacer distintas acciones correctoras o preventivas
            //peticion.params.numero1 = 0
            //siguiente(new Error('numero1 no es un número'))
            // podemos retornar directamente el error
            respuesta.status(400).send('numero1 no es un número')
            // ... pero en ese caso hay que terminar la ejecución
            return
        }
        siguiente()
    })
}