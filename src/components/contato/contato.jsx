import React, { Component } from "react";
import { Cabecalho }from "../shared/cabecalho/cabecalho";
import ContatoImagem from "./contatoImagem/contatoImagem";
import ContatoTexto from "./contatoTexto/contatoTexto";
import "./contato.scss"
export class Contato extends Component{
    render(){
        return(
            <div>
              <Cabecalho />
              <section className="Contato">
                <ContatoImagem />
                <ContatoTexto />        
              </section>
            </div>
        )
    }
}

export default Contato;