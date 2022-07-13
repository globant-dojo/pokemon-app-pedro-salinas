import { useCallback, useEffect, useState } from "react";
import "./confirmationModal.css";

export const ConfirmationModal = ({ open, setConfirmation }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const closeModal = (type) => {
    setModalIsOpen(false);
    setConfirmation(type);
  };
  const openModal = useCallback(() => {
    setModalIsOpen(open);
  }, [open]);

  useEffect(() => {
    openModal();
  }, [openModal]);

  return (
    <div
      id="p-modal"
      className={modalIsOpen ? "modal modal-open" : "modal modal-close"}
    >
      <span
        onClick={() => closeModal(false)}
        className="close"
        title="Close Modal"
      >
        ×
      </span>
      <form className="modal-content">
        <div className="container-modal">
          <h2>Eliminar Pokemon</h2>
          <p>¿Estás seguro que quieres eliminar el pokemon?</p>

          <div className="clearfix">
            <button
              type="button"
              onClick={() => closeModal(false)}
              className="confirmation-btn cancelbtn"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={() => closeModal(true)}
              className="confirmation-btn deletebtn"
            >
              Eliminar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
