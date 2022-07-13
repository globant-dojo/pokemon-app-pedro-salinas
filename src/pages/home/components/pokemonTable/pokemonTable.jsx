import "./pokemonTable.css";
import del from '../../../../assets/icons/delete.png';
import edit from '../../../../assets/icons/edit.png';
import noImage from '../../../../assets/images/no-image.jpg';
export const PokemonTable = ({
  pokemons,
  editPokemon,
  deletePokemon,
  // onChangeTotalEntries,
}) => {
  const headers = ["", "Nombre", "Tipo", "Ataque", "Defensa", "HP",""];
  function openModal(pokemon) {
    editPokemon(pokemon);
  }
  function openModalConfirmation(pokemon) {
    deletePokemon(pokemon);
  }
  const TableHeadItem = ({ item }) => <th scope="col">{item}</th>;
  const TableRow = ({ pokemon }) => (
    <tr>
      <td>
        <img
          src={pokemon.image || noImage}
          alt={pokemon.name}
          className="avatar"
        />
      </td>
      <td>{pokemon.name}</td>
      <td>{pokemon.type}</td>
      <td>{pokemon.attack}</td>
      <td>{pokemon.defense}</td>
      <td>{pokemon.hp}</td>
      <td>
        <input type="image" alt="Pokemon" className="icon-btn" src={edit} onClick={() => openModal(pokemon)} />
        <input type="image" alt="Pokemon" className="icon-btn ml-1" src={del} onClick={() => openModalConfirmation(pokemon)} />
      </td>
    </tr>
  );

  // const setTotalEntries = (totalEntries) => {
  //   onChangeTotalEntries(totalEntries);
  // };

  return (
    <>
      {/* <TotalEntries setTotalEntries={setTotalEntries} /> */}
      <table className="p-table">
        <thead>
          <tr>
            {headers.map((item, index) => (
              <TableHeadItem item={item} key={index} />
            ))}
          </tr>
        </thead>
        <tbody>
          {pokemons.map((pokemon) => (
            <TableRow pokemon={pokemon} key={pokemon.id} />
          ))}
        </tbody>
      </table>
    </>
  );
};
