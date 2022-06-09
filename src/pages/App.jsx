import React from 'react';
import { Routes, Route, } from "react-router-dom";
import { Cabecalho }from "../components/shared/cabecalho/cabecalho"
import { Home } from "../components/home/home";
import { Pokemons } from "../components/pokemons/pokemons";
import {Contato } from "../components/contato/contato";
import './App.css';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Cabecalho/>} />
        <Route index element={<Home/>}/>
        <Route path='/Pokemons' element={<Pokemons/>}/>
        <Route path='/Contato' element={<Contato/>}/>
      </Routes>
    </div>
  );
}

export default App;
