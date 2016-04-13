#Comparación

DigitalOcean
https://m.do.co/c/a837eb86b396

## Inconvenientes
- No Transactions -> No Integrity
- No Joins *hasta la versión 3.2*
- No Schemma *hasta la versión 3.2*

## Ventajas
- Velocidad
- Flexibilidad
- Escalabilidad

#Conceptos

## Física
Server

Réplica

Shard

Database



## Lógica
Database

Collection

Document

Property

Schemma(-less)


#Comandos
mongod --dbpath
mongo

#GUI
robomongo


#esquemas n a m

facturas

facturas_productos

productos



Facturas :[ { _id, fecha, productos:[{des, pu, uds}] },{}]

Productos : [{_id, desc, facturas :[{},{}]}]

Facturas :[ { _id, fecha, productos:[ producto_id, producto_id] },{}]
Productos : [{_id, desc, pvp},{}]



Libros:
Autores: 
