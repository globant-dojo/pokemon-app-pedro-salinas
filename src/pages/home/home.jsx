import './home.css';
import React, { useCallback, useEffect, useState } from "react";
import { ConfirmationModal } from "../../components/confirmationModal/confirmationModal";
import { Spinner } from "../../components/spinner/spinner";
import { Toast } from "../../components/toast/toast";
import { TotalEntries } from "../../components/totalEntries/totalEntries";
import { useHttp } from "../../hooks/use-http";
import { PokemonForm } from "./components/pokemonForm/pokemonForm";
import { PokemonsFilter } from "./components/pokemonsFilter/pokemons-filter";
import { PokemonTable } from "./components/pokemonTable/pokemonTable";
export const Home = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [modalType, setModalType] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState({});
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState(false);
  const [totalEntries, setTotalEntries] = useState('10');

  const { loading, error, sendRequest: getPokemonsPromise } = useHttp();

  //   const getPokemonsPromise = useCallback(() => {
  //     return new Promise(async (resolve, reject) => {
  //       setLoading(true);
  //       setError(null);
  //       try {
  //         const response = await getPokemons(totalEntries);
  //         const data = await response.json();
  //         setPokemons(data);
  //         setFilteredPokemons(data);
  //         resolve(data);
  //         setLoading(false);
  //       } catch (error) {
  //         setError(error.message);
  //         reject(error);
  //         setLoading(false);
  //         showToast(error.message);
  //       }
  //     });
  //   }, [totalEntries]);
  const setPokemonsFetch = (pokemons) => {
    console.log(
      "🚀 ~ file: home.jsx ~ line 27 ~ setPokemonsFetch ~ pokemons",
      pokemons
    );
    setPokemons(pokemons);
    setFilteredPokemons(pokemons);
  };

  const getPokemonsHook = () => {
    getPokemonsPromise(
      {
        url: `https://bp-pokemons.herokuapp.com/${totalEntries}?idAuthor=1`,
      },
      setPokemonsFetch
    );
  };

  useEffect(() => {
    getPokemonsHook();
  }, [getPokemonsPromise]);

  const onChangeEditPokemon = (pokemon) => {
    setSelectedPokemon(pokemon);
    openModal("edit", pokemon);
  };

  const onChangeDeletePokemon = (pokemon) => {
    setSelectedPokemon(pokemon);
    setConfirmationOpen(true);
  };

  const onChangeTotal = (totalEntries) => {
    console.log(
      "🚀 ~ file: home.jsx ~ line 62 ~ onChangeTotal ~ totalEntries",
      totalEntries
    );
    setTotalEntries(totalEntries);
    // setTimeout(() => {
    getPokemonsHook();
    // });
  };

  let content = <p>Found no pokemons.</p>;
  if (filteredPokemons.length > 0) {
    content = (
      <>
        <TotalEntries setTotalEntries={onChangeTotal} />
        <PokemonTable
          pokemons={filteredPokemons}
          editPokemon={onChangeEditPokemon}
          deletePokemon={onChangeDeletePokemon}
          onChangeTotalEntries={onChangeTotal}
        />
      </>
    );
  }
  if (error) {
    content = <p>{error}</p>;
  }
  if (loading) {
    content = <Spinner />;
  }

  function openModal(type, pokemon) {
    setSelectedPokemon(pokemon);
    setModalType(type);
    setIsOpen(true);
  }

  function onCloseHandler() {
    setIsOpen(false);
  }

  async function onSubmitHandler(type, pokemon) {
    let id;
    const getFetchData = (data) => {
      showToast(
        `Pokemon ${type === "new" ? "creado" : "editado"} correctamente.`
      );
      getPokemonsHook();
    };
    setIsOpen(false);
    if (type === "edit") {
      id = pokemon.id;
      delete pokemon.id;
    }
    const url = type === "new" ? "https://bp-pokemons.herokuapp.com/?idAuthor=1" : `https://bp-pokemons.herokuapp.com/${id}`;
    getPokemonsPromise(
      {
        url,
        method: type === "new" ? "POST" : "PUT",
        body: pokemon
      },
      getFetchData
    );
  }

  function onChangePokemons(pokemons) {
    setFilteredPokemons(pokemons);
  }

  async function onConfirmationChange(type) {
    const getDeleteData = (data) => {
      if (data?.success) {
        showToast("Pokemon eliminado correctamente.");
      } else {
        showToast(
          "Ha ocurrido un error, por favor inténtelo de nuevo más tarde."
        );
      }
      getPokemonsHook();
    };

    if (type) {
      const { id } = selectedPokemon;
      getPokemonsPromise(
        {
          url: `https://bp-pokemons.herokuapp.com/${id}`,
          method: "DELETE"
        },
        getDeleteData
      );
    }
    // setLoading(false);
    setSelectedPokemon({});
    setConfirmationOpen(false);
  }

  const showToast = (message) => {
    setToastMsg(message);
    setToastOpen(true);
    setTimeout(() => {
      setToastOpen(false);
      setToastMsg("");
    }, 3000);
  };

  return (
    <>
      <div className="container">
        <div className="text-center mt-3">
          <h1 className='title'>Listado de Pokemon</h1>
        </div>
        <div className="nav-cont">
          <PokemonsFilter
            pokemons={pokemons}
            onChangePokemons={onChangePokemons}
          />
          <button onClick={() => openModal("new", {})} className="btn primary-button">Nuevo</button>
        </div>
        {content}
      </div>
      <PokemonForm
        modalIsOpen={modalIsOpen}
        pokemon={selectedPokemon}
        onSubmitForm={onSubmitHandler}
        onClose={onCloseHandler}
        type={modalType}
        totalEntries={totalEntries}
      />
      <ConfirmationModal
        open={confirmationOpen}
        setConfirmation={onConfirmationChange}
      />
      <Toast message={toastMsg} isOpen={toastOpen} />
    </>
  );
};
