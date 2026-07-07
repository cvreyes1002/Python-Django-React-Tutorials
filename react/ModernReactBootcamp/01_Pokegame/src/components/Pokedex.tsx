import Pokecard from "./Pokecard";
import "../styles/Pokedex.css"

interface PokeData {
  id: number;
  name: string;
  type: string;
  base_experience: number;
}

interface PokedexProps {
  pokemon: PokeData[];
  exp: number;
  isWinner: boolean;
}

function Pokedex({pokemon, exp, isWinner}: PokedexProps) {
  return (
    <div className="Pokedex">
      <h1>Pokedex!</h1>
      <p>Total Experience: {exp}</p>
      <p>{isWinner ? "WIN!!" : "LOSE!!"}</p>
      <div className="Pokedex-cards">
        {pokemon.map((p) => {
          return (
            <Pokecard
              key={p.id}
              id={p.id}
              name={p.name}
              type={p.type}
              exp={p.base_experience}
            />
          )
        })}
      </div>
    </div>
  );
}

export default Pokedex;
