import React from "react";

export default class Deuda extends React.Component {
	render() {
		const nombre = this.props.nombre;
		const valor = Math.abs(this.props.valor);
		const onClick = this.props.onClick;

		return (
			<tr onClick={() => onClick(nombre)}>
				<td>
					{nombre}
				</td>
				{valor !== 0 && 
					<td>
						{valor}
					</td>
				}
			</tr>
		);
	}
}