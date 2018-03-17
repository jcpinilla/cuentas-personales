import React from "react";
import Aut from "./Aut";
import App from "./App";

export default class Index extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			login: null,
			primeraVez: false
		};

		this.ingresar = this.ingresar.bind(this);
		this.cerrarSesion = this.cerrarSesion.bind(this);
	}

	ingresar(login, primeraVez) {
		this.setState({
			login,
			primeraVez
		});
	}

	cerrarSesion() {
		this.setState({
			login: null
		});
	}

	render() {
		return (
			<div>
				{
					this.state.login === null &&
						<Aut ingresar={this.ingresar}/>
				}
				{this.state.login !== null &&
					<App
						login={this.state.login}
						primeraVez={this.state.primeraVez}
						cerrarSesion={this.cerrarSesion}/>
				}
			</div>
		);
	}
}