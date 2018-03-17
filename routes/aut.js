const express = require("express");
const router = express.Router();

const MongoClient = require("mongodb").MongoClient;
const url = process.env.MONGOLAB_URI;
const dbName = "proyecto-2";

// verifica si un usuario está registrado y la contraseña coindice
router.post("/login", (req, res) => {
	const log = req.body;
	const login = log.login;
	const contrasena = log.contrasena;
	query({login}, data => {
		if (data === null || contrasena !== data.contrasena) {
			res.json({res: "no"});
		} else {
			res.json({res: "ok"});
		}
	});
});

// crea una nueva cuenta, si no existe un usuario registrado con dicho login
router.post("/crearCuenta", (req, res) => {
	const cuenta = req.body;
	const login = cuenta.login;
	query({login}, (data, db) => {
		if (data !== null) {
			res.json({res: "no"});
		} else {
			db.collection("usuarios").insertOne(cuenta, function(err, result) {
				res.json({res: "ok"});
			});
		}
	});
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

module.exports = router;