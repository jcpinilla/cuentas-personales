import React from "react";

export default class Tx extends React.Component {
	render() {
		const valor = this.props.valor;
		const fecha = this.props.fecha;
		const concepto = this.props.concepto;
		const fechaFormato = new Date(fecha).toLocaleDateString("es-CO");
		return (
			<tr>
				<td>{valor}</td>
				<td>{fechaFormato}</td>
				<td>{concepto}</td>
			</tr>
		);
	}
}