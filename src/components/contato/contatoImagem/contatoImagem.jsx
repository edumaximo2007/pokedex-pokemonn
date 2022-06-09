import React, { Component } from "react";
import BannerContato from "../../../assets/img/bannerContato.png";
import "./contatoImagem.scss"
export class ContatoImagem extends Component{
    render(){
        return(
            <div className="Contato__caixa___imagem">
                    <img className="Contato__caixa___imagem-imagem" src={BannerContato} alt="Ash Com pikachu rindo" />
                  </div>
        );
    };
};

export default ContatoImagem;