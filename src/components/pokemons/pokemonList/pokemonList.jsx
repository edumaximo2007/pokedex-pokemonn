import React from 'react';
import Carousel from 'react-grid-carousel';
import PokemonCard from '../pokemonCard/pokemonCard';
import "./pokemonList.scss"
export const CardList = props => (
  
     <Carousel  
      cols={6} rows={3} gap={8} 
      containerStyle={{ maxWidth: '100%'}}
     showDots
     reponsiveLayout={
      [ 
        { breakpoint: 1024, 
          cols: 3 , 
          rows:1, 
          gap: 6 },
        { breakpoint: 750,
          cols: 1,
          rows: 1
          
        }

      ]
     }
    >
    {props.pokemons.map(pokemon => {
    return (
    <Carousel.Item key={pokemon}>
      <div className='Lista__cartao'>          
        <PokemonCard key={pokemon.name} pokemon={pokemon}></PokemonCard>      
       </div>
    </Carousel.Item>
  );
})}
</Carousel> 

);


