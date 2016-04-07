'use strict'
// Se requiere la presencia del módulo de express
// previamente instalado usando
// npm install express --save
const express = require('express')

// Es frecuente llamar app a la instancia de express
const app = express()

// Respondemos a las peticiones mediante un mecanismo de suscripción y callbacks
app.get('/', (peticion, respuesta) =>  respuesta.send('Hola ExprEsS6!'))

// configuración de lógica intermedia
const middleware = require('./middleware')

// el middleware debería crear y devolver la app configurada
middleware.useMiddleware(app, express)

// Respondemos a las peticiones mediante un mecanismo de suscripción y callbacks
app.get('/about', (peticion, respuesta) =>  respuesta.send('Hecho con tencología Back Edge!!'))


require('./rutas')(app)

// Configuramos la aplicación para escuchar en el puerto 3000
app.listen(3000)


