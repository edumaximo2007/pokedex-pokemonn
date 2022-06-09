import React from 'react'

import "./pokemonCard.scss"
export const PokemonCard = props =>(
    <div className="Lista__cartao">
           <h2>{props.pokemon.name[0].toUpperCase()+props.pokemon.name.slice(1)}</h2>
           <img alt="pokemon" src={`https://img.pokemondb.net/artwork/large/${props.pokemon.name}.jpg`}/>
           </div>
);

export default PokemonCard;
