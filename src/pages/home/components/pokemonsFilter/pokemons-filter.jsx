import { useState } from "react";
import './pokemons-filter.css';
export const PokemonsFilter = ({ pokemons, onChangePokemons }) => {
  const [searchInput, setSearchInput] = useState("");
  const onChangeInput = (event) => {
    const txt = event.target.value;
    setSearchInput(txt);
    const filteredPokemons = filterByValue(pokemons, txt);
    onChangePokemons(filteredPokemons);
  };

  function filterByValue(pokemons, string) {
    return pokemons.filter((p) =>
      p.name.toLowerCase().includes(string.toLowerCase())
    );
  }
  return (
    <div className="field search-input">
      <input
        type="text"
        placeholder="Buscar"
        onChange={onChangeInput}
        value={searchInput}
      />
    </div>
  );
};
