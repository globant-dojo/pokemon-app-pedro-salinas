const headers = {
  "Content-Type": "application/json",
};

export const deletePokemon = (id) => {
  return fetch(`https://bp-pokemons.herokuapp.com/${id}`, {
    method: "DELETE",
    headers,
  });
};

export const updatePokemon = (pokemon) => {
  const { id } = pokemon;
  delete pokemon.id;
  return fetch(`https://bp-pokemons.herokuapp.com/${id}`, {
    method: "PUT",
    headers,
    body: JSON.stringify(pokemon),
  });
};

export const getPokemons = (totalEntries) => {
  return fetch(`https://bp-pokemons.herokuapp.com/${totalEntries}?idAuthor=1`);
};

export const createPokemon = (pokemon) => {
  return fetch("https://bp-pokemons.herokuapp.com/?idAuthor=1", {
    method: "POST",
    headers,
    body: JSON.stringify(pokemon),
  });
};
