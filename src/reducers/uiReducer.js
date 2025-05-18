import { types } from "../types/types";
// Importa los tipos de acciones definidos en el archivo de tipos, para evitar errores por escribir strings manualmente.

const initialState = {
  modalOpen: false,
};
// Define el estado inicial del reducer de interfaz. En este caso, la aplicación comienza con el modal cerrado.

export const uiReducer = (state = initialState, action) => {
  // Declara y exporta el reducer de interfaz de usuario.
  // Recibe el estado actual y una acción, y devuelve un nuevo estado según el tipo de acción.

  switch (action.type) {
    case types.uiOpenModal:
      return {
        ...state,
        modalOpen: true,
      };
    // Si la acción es "uiOpenModal", cambia el estado para indicar que el modal está abierto.

    default:
      return state;
    // Si la acción no coincide con ningún tipo conocido, devuelve el estado actual sin modificar.
  }
};
