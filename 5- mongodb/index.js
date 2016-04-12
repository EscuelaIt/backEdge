'use strict'
const express = require('express')
const app = express()

const middleware = require('./middleware')
middleware.useMiddleware(app, express)

const mongodb = require('./mongodb')
mongodb.connecting()
    .then(() => {
        require('./rutas')(app)
        app.listen(3030)
        console.log('listening on port 3030')
    })
    .catch(err=>console.error(err))

