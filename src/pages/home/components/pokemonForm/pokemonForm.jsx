import React, { useCallback, useEffect } from "react";
import "./pokemonForm.css";
import Modal from "react-modal";
import cancel from "../../../../assets/images/cancel.png";
import useInput from "../../../../hooks/use-input";
const isNotEmpty = (value) => value.trim() !== '';
export const PokemonForm = ({
  modalIsOpen,
  onClose,
  pokemon,
  type,
  onSubmitForm,
}) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      maxWidth: "30rem",
      minWidth: "25rem",
      transform: "translate(-50%, -50%)",
    },
  };

  const {
    value: nameValue,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetName,
  } = useInput(isNotEmpty);

  const {
    value: imageValue,
    isValid: imageIsValid,
    hasError: imageHasError,
    valueChangeHandler: imageChangeHandler,
    inputBlurHandler: imageBlurHandler,
    reset: resetImage,
  } = useInput(isNotEmpty);

  const {
    value: typeValue,
    isValid: typeIsValid,
    hasError: typeHasError,
    valueChangeHandler: typeChangeHandler,
    inputBlurHandler: typeBlurHandler,
    reset: resetType,
  } = useInput(isNotEmpty);

  const {
    value: attackValue,
    valueChangeHandler: attackChangeHandler,
    reset: resetAttack,
  } = useInput(() => { });

  const {
    value: defenseValue,
    valueChangeHandler: defenseChangeHandler,
    reset: resetDefense,
  } = useInput(() => { });
  const {
    value: hpValue,
    valueChangeHandler: hpChangeHandler,
    reset: resetHp,
  } = useInput(() => { });

  let formIsValid = false;

  if (nameIsValid && imageIsValid && typeIsValid) {
    formIsValid = true;
  }

  function closeModal() {
    onClose();
  }
  function closeModalForm(event) {
    event.preventDefault();
    closeModal();
  }
  const setPokemonForm = useCallback(() => {
    resetName(pokemon?.name || "");
    resetImage(pokemon?.image || "");
    resetType(pokemon?.type || "");
    resetAttack(pokemon?.attack || "50");
    resetDefense(pokemon?.defense || "50");
    resetHp(pokemon?.hp || "50");
  }, [pokemon,
    // resetName,
    // resetImage,
    // resetType,
    // resetAttack,
    // resetDefense,
    // resetHp
  ]);

  const submitHandler = async (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }
    const form = {
      name: nameValue,
      attack: attackValue,
      defense: defenseValue,
      image: imageValue,
      hp: hpValue,
      type: typeValue,
      idAuthor: 1,
    };
    if (type === "edit") form.id = pokemon.id;
    resetName();
    resetImage();
    resetType();
    resetAttack();
    resetDefense();
    resetHp();
    onSubmitForm(type, form);
  };

  useEffect(() => {
    setPokemonForm();
  }, [setPokemonForm]);

  const nameClasses = `${nameHasError ? 'field invalid' : 'field'} padding-bottom--24`;

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel={pokemon.name}
    >
      <div className="form-container">
        <div className="modal-header">
          <h2 className="title bold">{type === "new" ? "Nuevo" : "Editar"} Pokemon</h2>
          <input type="image" alt="Pokemon" className="icon-btn" src={cancel} onClick={closeModal} />
        </div>
        {imageValue && (
          <div className="text-center">
            <img src={imageValue} alt="Pokemon" className="avatar avatar-modal" />
          </div>
        )}
        <form onSubmit={submitHandler} className="p-form">
          <div className={nameClasses}>
            <label htmlFor="name">Nombre</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Nombre"
              value={nameValue}
              onChange={nameChangeHandler}
              onBlur={nameBlurHandler}
            />
            {nameHasError && <span className="text-danger">Por favor ingrese un nombre.</span>}
          </div>

          <div className="field padding-bottom--24">
            <label htmlFor="image">Imagen</label>
            <input
              type="text"
              className="form-control"
              id="image"
              placeholder="URL"
              value={imageValue}
              onChange={imageChangeHandler}
              onBlur={imageBlurHandler}
            />
            {imageHasError && <span className="text-danger">Por favor ingrese una imagen.</span>}
          </div>

          <div className="field padding-bottom--24">
            <label htmlFor="type">Tipo</label>
            <input
              type="text"
              className="form-control"
              id="type"
              placeholder="Tipo"
              value={typeValue}
              onChange={typeChangeHandler}
              onBlur={typeBlurHandler}
            />
            {typeHasError && <span className="text-danger">Por favor ingrese un tipo.</span>}
          </div>

          <div className="padding-bottom--24">
            <label htmlFor="attack">Ataque: {attackValue}</label>
            <input
              type="range"
              className="form-control"
              id="attack"
              min="1"
              max="100"
              onChange={attackChangeHandler}
              value={attackValue}
            />
          </div>

          <div className="padding-bottom--24">
            <label htmlFor="defense">Defensa: {defenseValue}</label>
            <input
              type="range"
              className="form-control"
              id="defense"
              min="1"
              max="100"
              onChange={defenseChangeHandler}
              value={defenseValue}
            />
          </div>

          <div className="padding-bottom--24">
            <label htmlFor="attack">HP: {hpValue}</label>
            <input
              type="range"
              className="form-control"
              id="hp"
              min="1"
              max="500"
              onChange={hpChangeHandler}
              value={hpValue}
            />
          </div>
          <div className="btn-footer">
            <button className="btn light-button" onClick={closeModalForm}>
              Cancelar
            </button>
            <button type="submit" className="btn secondary-button ml-1" disabled={!formIsValid}>
              {type === "new" ? "Crear" : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
