import React from "react";
import Txs from "./Txs";
import AnadirTx from "./AnadirTx"

export default class Persona extends React.Component {
	render() {
		const persona = this.props.persona;
		if (!persona) {
			return null;
		}
		const nombre = persona.nombre;
		const valor = persona.valor;
		return (
			<div>
				<div className="container">
					<div className="row">
						<div className="col-sm-6">
							<h1>{nombre}</h1>
							<p id="valor-persona">
								{
									valor < 0 ? "Me debe: " : (valor > 0) ? "Le debo: " : "Al día"
								}
								{
									valor !== 0 && Math.abs(valor)
								}
							</p>
						</div>
						<div className="col-sm-6">
							<AnadirTx
								anadirTx={this.props.anadirTx}
							/>
						</div>
					</div>
				</div>
				<br />
				<Txs {...persona} />
			</div>
		);
	}
}
