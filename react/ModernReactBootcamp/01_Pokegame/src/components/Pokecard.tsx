// import React from 'react'
import '../styles/Pokecard.css'

// const POKE_API = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"
const POKE_API = "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/"

interface PokeCardProps {
  id: number;
  name: string;
  type: string;
  exp: number;
}

let padToThree = (pokeID: number): string => `00${pokeID}`.slice(-3);

export function Pokecard({id, name, type, exp}: PokeCardProps) {
  let imgSrc = `${POKE_API}${padToThree(id)}.png`
  return (
    <div className="Pokecard">
      <h1 className="Pokecard-title">{name}</h1>
      <img src={imgSrc} />
      <div className="Pokecard-data">Type: {type}</div>
      <div className="Pokecard-data">EXP: {exp}</div>
    </div>
  )
}

export default Pokecard

