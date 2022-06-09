import React, { Component } from "react";
import BannerComplete from "../../../assets/img/BannerComplete.png"
import "./homeImagem.scss"
export class HomelImagem  extends Component{
    render(){
        return(
            <div className="Caixa__imagem">
                <img className="Principal__imagem" src={BannerComplete} alt="Picachu, pokebolas ao redor das nuvens" />
            </div>
        );
    }
}


export default HomelImagem;
