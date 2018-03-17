const express = require("express");
const router = express.Router();

const MongoClient = require("mongodb").MongoClient;
const url = process.env.MONGOLAB_URI;
const dbName = "proyecto-2";

// obtiene la informacion del usuario con el login que llega por parametro
router.get("/:login", (req, res) => {
	const login = req.params.login;
	query({login}, data => res.json(data.personas));
});

function query(query, callback) {
	MongoClient.connect(url, (err, client) => {
		if (err) throw err;
		const db = client.db(dbName);
		db.collection("usuarios").findOne(query, function(err, result) {
			if (err) throw err;
			callback(result, db);
			client.close();
		});
	});
}

// crea una nueva persona para el usuario con el login que llega por parametro
router.post("/:login/personas", (req, res) => {
	const login = req.params.login;
	const persona = req.body;
	query({login}, (data, db) => {
		let personas = data.personas;
		if (personas.filter(p => p.nombre === persona.nombre).length === 1) {
			res.json(null);
		} else {
			personas.push(persona);
			db.collection("usuarios").updateOne({login}, {$set: {personas}});
			res.json(personas);
		}
	});
});

// agrega una nueva transaccion para la persona que llega como parametro
router.post("/:login/personas/:nombre/transacciones", (req, res) => {
	const params = req.params;
	const login = params.login;
	const nombre = params.nombre;

	query({login}, (data, db) => {
		let personas = data.personas;
		let persona;
		for(let p of personas) {
			if(p.nombre === nombre) {
				persona = p;
				break;
			}
		}
		let txs = persona.txs;
		let tx = req.body;
		txs.push(tx);
		persona.valor += tx.valor;
		db.collection("usuarios").updateOne({login}, {$set: {personas}});
		res.json(personas);
	});
});

module.exports = router;