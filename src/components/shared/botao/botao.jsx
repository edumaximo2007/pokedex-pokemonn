import React,{ Component } from "react";
import "./botao.scss";
import "../../../global.scss";
export class Botao extends Component{
    render(){
        return(
            <div className="botao">
                <a className="botao__link" href="/pokemons">Veja os pokemons</a>
            </div>
        )
    }
}

export default Botao;