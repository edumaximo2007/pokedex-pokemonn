import React,{ Component} from "react";
import "./homeTexto.scss"
import "../../../global.scss"
import Botao from "../../shared/botao/botao";
export class HomelTexto extends Component{
    render(){
        return(
            <div className="Principal">
                <h1 className="Principal__titulo">Qual pokemon você escolheria?</h1>
                <div className="Caixa__subtitulo">
                    <h2 className="Principal__subtitulo">Você pode saber o tipo de Pokémon, seus pontos fortes, fracos e habilidades.</h2>
                </div>
                <Botao />
            </div>
        );
    }
}