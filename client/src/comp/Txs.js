import React from "react";
import Tx from "./Tx";

export default class Txs extends React.Component {
	render() {
		const txs = this.props.txs;
		if (!txs || txs.length === 0) {
			return null;
		}
		return (
			<div>
				<h3>Transacciones</h3>
				<table className="table table-hover">
					<thead className="table-secondary">
						<tr>
							<th>Valor</th>
							<th>Fecha</th>
							<th>Concepto</th>
						</tr>
					</thead>
					<tbody>
						{
							txs.map(tx =>
								<Tx key={tx.fecha} {...tx} />
							)
						}
					</tbody>	
				</table>
			</div>
		);
	}
}
