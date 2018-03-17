import React from "react";
import "../styles/App.css";
import Grupos from "./Grupos";
import Persona from "./Persona";

export default class App extends React.Component {
	constructor(props) {
		super(props);
		const login = this.props.login;
		this.state = {
			login,
			actual: null,
			filtro: "",
			personas: []
		};
		this.cambiarPersona = this.cambiarPersona.bind(this);
		this.anadirPersona = this.anadirPersona.bind(this);
		this.filtrar = this.filtrar.bind(this);
		this.anadirTx = this.anadirTx.bind(this);
	}

	componentDidMount() {
		fetch(`/api/usuarios/${this.state.login}`)
			.then(res => res.json())
			.then(data => {
				this.setState({
					personas: data
				});
			});
	}

	darPersona() {
		const personas = this.state.personas;
		const actual = this.state.actual;
		for (let p of personas) {
			if (p.nombre === actual) {
				return p;
			}
		}
		return null;
	}

	cambiarPersona(nombre) {
		this.setState({
			actual: nombre
		});
	}

	anadirTx(valor, concepto) {
		const tx = {
			valor,
			concepto,
			fecha: new Date().getTime()
		};
		fetch(`/api/usuarios/${this.state.login}/personas/${this.state.actual}/transacciones`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(tx)
		})
			.then(res => res.json())
			.then(data => {
				this.setState({personas: data});
			});
	}


	anadirPersona(nombre) {
		const persona = {
			nombre,
			valor: 0,
			txs: []
		};
		fetch(`/api/usuarios/${this.state.login}/personas`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(persona)
		})
			.then(res => res.json())
			.then(data => {
				if(data !== null) {
					this.setState({personas: data});
				} else {
					alert("La persona ya se encuentra registrada");
				}
			});
	}

	filtrar(e) {
		this.setState({
			filtro: e.target.value
		});
	}

	render() {
		const personas = this.state.personas.filter(p =>
			p.nombre.toLowerCase().includes(this.state.filtro.toLowerCase())
		);
		return (
			<div>
				{
					this.props.primeraVez &&
					<div className="alert alert-info alert-dismissible">
						<button type="button" class="close" data-dismiss="alert" aria-label="close">&times;</button>
						<strong>¡Bienvenido! </strong>Ésta es una aplicación para manejar las cuentas personales. 
						Puedes agregar personas con las que quieres manejar las cuentas con el botón <strong>Agregar Persona</strong>.
						En la parte de <strong>Grupos </strong>
						puedes ver quién te debe, a quién le debes y otras personas con las que estás al día. Las personas en los grupos las puedes filtrar por nombre.
						Haciendo click sobre cada persona puedes ver el detalle de todas las transacciones que has tenido 
						con esa persona, así como agregar nuevas transacciones. En la parte de <strong>Transacciones </strong>, 
						un valor <em>positivo</em> indica que recibiste dinero, mientras que un valor <em>negativo</em> indica que diste dinero.
					</div>
				}
				<div className="container">
					<button id="cerrar-sesion" className="btn btn-secondary" type="button" onClick={this.props.cerrarSesion}>Cerrar Sesion</button><br />
					<div className="row">
						<div className="col-sm-6">
							<Grupos
								filtrar={this.filtrar}
								personas={personas}
								onClick={this.cambiarPersona}
								anadirPersona={this.anadirPersona}
							/>
						</div>
						<div className="col-sm-6">
							<Persona
								persona={this.darPersona()}
								anadirTx={this.anadirTx}
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}