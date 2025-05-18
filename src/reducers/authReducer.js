import { types } from "../types/types";
// Importa las constantes de tipos de acciones que se usarán para identificar qué acción se está ejecutando.

const initialState = {
  checking: false,
  uid: null,
  name: null,
  userData: null,
};

export const authReducer = (state = initialState, action) => {
  // Define el reducer de autenticación. Recibe el estado actual y una acción, y devuelve un nuevo estado.

  switch (action.type) {
    case types.authLogin:
      return {
        ...state,
        ...action.payload,
        checking: false,
      };
    // Si la acción es `authLogin`, actualiza el estado con los datos del payload (por ejemplo, uid y name) y marca `checking` como false.

    case types.authChekingFinish:
      return {
        ...state,
        checking: false,
      };
    // Si se terminó de verificar si el usuario está logueado, simplemente cambia `checking` a false.

    case types.authLogout:
      return {
        checking: false,
      };
    // Si el usuario hace logout, reinicia el estado dejando solo `checking` como false (borra uid, name, etc.).

    default:
      return state;
    // Si la acción no coincide con ninguna conocida, retorna el estado actual sin cambios.
  }
};
