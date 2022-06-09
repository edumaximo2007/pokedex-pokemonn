import React from "react";
import "./pokemonPesquisa.scss";
import "../../../global.scss"
export const PokemonPesquisa = ( {placeholder, handleChange }) =>{
    return(
        <div className="Caixa__pesquisa">
                <form action="">
                    <input  className="Pesquisa" type="search"  placeholder={placeholder} onChange={handleChange}/>
                </form>
            </div>       
    
    )
        
            
}



