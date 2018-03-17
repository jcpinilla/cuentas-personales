import React from "react";

export default class AnadirTx extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			valor: "",
			concepto: "",
			msgObligatorio: false
		};
		this.manejarCambioValor = this.manejarCambioValor.bind(this);
		this.manejarCambioConcepto = this.manejarCambioConcepto.bind(this);
		this.manejarRecibo = this.manejarRecibo.bind(this);
		this.manejarDoy = this.manejarDoy.bind(this);
		this.manejarSubmit = this.manejarSubmit.bind(this);
	}

	manejarCambioValor(e) {
		const valorString = e.target.value;

		this.setState({
			valor: valorString,
			msgObligatorio: false
		});
	}

	manejarCambioConcepto(e) {
		this.setState({
			concepto: e.target.value
		});
	}

	manejarRecibo() {
		this.manejarSubmit(true);
	}

	manejarDoy() {
		this.manejarSubmit(false);
	}

	manejarSubmit(recibo) {
		const anadirTx = this.props.anadirTx;
		let valor = this.state.valor;
		if (valor === "" || valor === "0") {
			this.setState({
				msgObligatorio: true
			});
			return;
		}
		valor = Math.abs(valor);
		if (!recibo) {
			valor = valor * -1;
		}
		valor = +valor;
		const concepto = this.state.concepto;
		anadirTx(valor, concepto);
		this.setState({
			valor: "",
			concepto: ""
		});
	}

	render() {
		return (
			<div>
				<h3>Agregar transacción</h3>
				<form>
					<input
						type="number"
						value={this.state.valor}
						placeholder="Valor"
						onChange={this.manejarCambioValor}/><br />
					<input
						type="text"
						value={this.state.concepto}
						placeholder="Concepto (opcional)"
						onChange={this.manejarCambioConcepto}/><br />
					<button
						className="btn btn-info"
						type="button"
						onClick={this.manejarRecibo}>
					Recibo
					</button>
					<button
						id="btn-doy"
						className="btn btn-info"
						type="button"
						onClick={this.manejarDoy}>
					Doy
					</button>
					<br />
					{
						this.state.msgObligatorio &&
						<span>El valor es obligatorio</span>
					}
				</form>
			</div>
		);
	}
}