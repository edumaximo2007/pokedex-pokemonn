import React, {Component} from "react";
import "./pokemons.scss";
import { Cabecalho }from "../shared/cabecalho/cabecalho";
import { PokemonPesquisa } from "./pokemonPesquisa/pokemonPesquisa"
import { PokemonTexto } from "./pokemonTexto/pokemonTexto"
import { CardList } from "./pokemonList/pokemonList";
/* import axios from "axios"; */

export class Pokemons extends Component {
    constructor(){
        super();
    
        this.state = {
          pokemons: [],
          pesquisar:''
        };
      }; 
      componentDidMount(){
        fetch('https://pokeapi.co/api/v2/pokemon?limit=891')
        .then(response => response.json())
        .then(name => this.setState({pokemons:name.results}));
        console.log()
        
      };
    
      handleChange=(e) => {
        this.setState({pesquisar: e.target.value});
      };
      
      render(){
    
        const {pokemons, pesquisar } = this.state;
        const ListPokemons = pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(pesquisar.toLowerCase()));

        return(
            <div>
                <Cabecalho />
                <section className="Pokemons">
                  <PokemonTexto/>
                  <PokemonPesquisa  
                    placeholder='Pesquisar Pokemon' 
                    handleChange= {this.handleChange}/>
                  <div className="card">
                      <CardList pokemons={ListPokemons} />
                  </div>
                </section>
            </div>
        )
    };
};
export default Pokemons;
