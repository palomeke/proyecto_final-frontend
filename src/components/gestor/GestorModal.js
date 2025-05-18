import React, { useState } from "react";
// Importa React y el hook useState para manejar estados locales.

import { useSelector } from "react-redux";
// Importa useSelector para acceder al estado global de Redux.

//import ReactDOM, { useFormState } from "react-dom";
// Importa ReactDOM (aunque no se usa aquí) y useFormState (que no es un export válido de react-dom, parece un error o importación innecesaria).

import moment from "moment";
// Importa moment.js para manejo de fechas.

import Modal from "react-modal";
// Importa Modal de 'react-modal' para crear modales accesibles.

import DateTimePicker from "react-datetime-picker";
// Importa DateTimePicker para seleccionar fechas y horas.

import Swal from "sweetalert2";
// Importa SweetAlert2 para mostrar alertas bonitas.

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
// Estilos personalizados para centrar el modal en la pantalla.

Modal.setAppElement("#root");
// Define el elemento raíz de la app para accesibilidad (evita que lectores de pantalla lean contenido fuera del modal).

const now = moment().minutes(0).seconds(0).add(1, "hours");
// Hora actual redondeada a la siguiente hora (sin minutos ni segundos).

const nowPlus1 = now.clone().add(1, "hours");
// Una hora después de "now".

export const GestorModal = () => {
  const { modalOpen } = useSelector((state) => state.ui);
  // Obtiene desde Redux si el modal debe estar abierto o cerrado.

  const [dateStart, setDateStart] = useState(now.toDate());
  // Estado local para fecha de inicio, inicializada en "now".

  const [dateEnd, setDateEnd] = useState(nowPlus1.toDate());
  // Estado local para fecha de fin, inicializada en "nowPlus1".

  const [titleValid, setTitleValid] = useState(true);
  // Estado para controlar validación del título del evento.

  const [formValues, setFormValues] = useState({
    title: "Evento",
    notes: "",
    start: now.toDate(),
    end: nowPlus1.toDate(),
  });
  // Estado para el formulario con valores iniciales para título, notas, inicio y fin.

  const { notes, title, start, end } = formValues;
  // Desestructuración para usar las variables directamente.

  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };
  // Función que actualiza el estado del formulario al cambiar algún input (título o notas).

  const closeModal =
    () =>
    ({ target }) => {
      //CERRAR EL MODAL
    };
  // Función para cerrar el modal. Actualmente no hace nada (falta implementar).

  const handleStartDateChange = (e) => {
    setDateStart(e);
    setFormValues({
      ...formValues,
      start: e,
    });
  };
  // Actualiza la fecha de inicio tanto en el estado local como en el formulario.

  const handleEndDateChange = (e) => {
    setDateEnd(e);
    setFormValues({
      ...formValues,
      end: e,
    });
  };
  // Actualiza la fecha de fin en los estados correspondientes.

  const handleSubmitForm = (e) => {
    e.preventDefault();
    // Previene el envío tradicional del formulario.

    const momentStart = moment(start);
    const momentEnd = moment(end);
    // Convierte fechas a objetos moment para compararlas.

    if (momentStart.isSameOrAfter(momentEnd)) {
      Swal.fire("Error", "La fecha fin debe ser mayor a la fecha de inicio");
      return;
    }
    // Valida que la fecha fin sea posterior a la fecha inicio, si no muestra error.

    if (title.trim().length < 2) {
      return setTitleValid(false);
    }
    // Valida que el título tenga al menos 2 caracteres.

    //Realizar grabacion en la bd
    setTitleValid(true);
    closeModal();
    // Aquí se debería hacer la llamada para guardar el evento y cerrar modal.
  };

  return (
    <Modal
      isOpen={modalOpen}
      onRequestClose={closeModal}
      style={customStyles}
      closeTimeoutMS={200}
      className="modal"
      overlayClassName="modal-fondo"
    >
      <h1> Nuevo evento </h1>
      <hr />
      <form className="container" onSubmit={handleSubmitForm}>
        <div className="form-group ">
          <label>Fecha y hora inicio</label>
          <DateTimePicker
            onChange={handleStartDateChange}
            value={dateStart}
            className="form-control"
          />
        </div>
        <div className="form-group mb-2">
          <label>Fecha y hora fin</label>
          <DateTimePicker
            onChange={handleEndDateChange}
            value={dateEnd}
            minDate={dateStart}
            className="form-control"
          />
        </div>
        <hr />
        <div className="form-group mb-2">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${!titleValid && "is-invalid"}`}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={title}
            onChange={handleInputChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>
        <div className="form-group mb-2">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={notes}
            onChange={handleInputChange}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>
        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};
