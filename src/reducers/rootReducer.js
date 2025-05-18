import { combineReducers } from "redux";
// Importa la función combineReducers de Redux, que permite combinar múltiples reducers en uno solo.

import { authReducer } from "./authReducer";
// Importa el reducer de autenticación, encargado de manejar el estado del usuario (login, logout, etc.).

import { uiReducer } from "./uiReducer";
// Importa el reducer de interfaz de usuario, que controla aspectos visuales como modales, loaders, etc.

export const rootReducer = combineReducers({
  ui: uiReducer,
  auth: authReducer,
});
// Crea y exporta el reducer raíz combinando los reducers 'ui' y 'auth'.
// El estado global del store tendrá dos ramas principales: state.ui y state.auth.
