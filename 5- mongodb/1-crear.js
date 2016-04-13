// INSTRUCCIONES PARA SER EJECUTADAS DESDE LA TERMINAL


use control_caja

db.movimientos.drop()
db.createCollection('movimientos')

var movimiento = {
    user: 'albertobasalo@agorabinaria.com',
	tipo: 'Ingreso',
	categoria: 'Nómina',
	importe: 1200,
	fecha: new Date(2015, 03, 06, 12, 00, 00, 000)
};
db.movimientos.insert(movimiento);

var nomina_alberto = {
	user: 'albertobasalo@agorabinaria.com',
	tipo: 'Ingreso',
	categoria: 'Nómina',
	importe: 1200,
	fecha: new Date(2015, 03, 01, 12,00, 00, 000)
};
db.movimientos.insert(nomina_alberto);
db.movimientos.find();
var hipoteca_alberto = {
	user: 'albertobasalo@agorabinaria.com',
	tipo: 'Gasto',
	categoria: 'Hipoteca',
	importe: 400,
	fecha: new Date(2015, 03, 06, 12, 0, 00, 000)
};
db.movimientos.insert(hipoteca_alberto);
var nomina_pepito = {
	user: 'pepito@gmail.com',
	tipo: 'Ingreso',
	categoria: 'Nómina',
	importe: 1100,
	fecha: new Date(2015, 03, 02, 12, 0, 00, 000)
};
db.movimientos.insert(nomina_pepito);
var hipoteca_pepito = {
	user: 'pepito@gmail.com',
	tipo: 'Gasto',
	categoria: 'Hipoteca',
	importe: 450,
	fecha: new Date(2015, 03, 04, 12, 0, 00, 000)
};
db.movimientos.insert(hipoteca_pepito);

db.movimientos.find().pretty();
