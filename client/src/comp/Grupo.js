import React from "react";
import Deuda from "./Deuda";

export default class Grupo extends React.Component {
	render() {
		const titulo = this.props.titulo;
		const personas = this.props.personas;
		const onClick = this.props.onClick;
		return (
			<table className="table table-hover">
				<thead className="table-secondary">
					<tr>
						<th colSpan="2">{titulo}</th>
					</tr>
				</thead>
				<tbody>
					{
						personas.map(persona => 
							<Deuda
								key={persona.nombre}
								nombre={persona.nombre}
								valor={persona.valor}
								onClick={onClick}
							/>
						)
					}
				</tbody>
			</table>
		);
	}
}