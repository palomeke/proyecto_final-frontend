import { compose, createStore, applyMiddleware } from "redux";
// Importa funciones de Redux necesarias para crear el store, aplicar middleware y componer enhancers.

import { thunk } from "redux-thunk";
// Importa el middleware redux-thunk, que permite manejar acciones asíncronas (por ejemplo, llamadas a APIs).

import { rootReducer } from "../reducers/rootReducer";
// Importa el reducer raíz que combina todos los reducers de la aplicación.

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;
// Habilita la extensión Redux DevTools en el navegador, si está disponible.
// Si no, utiliza el compose de Redux por defecto.

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
// Crea el store de Redux con el reducer raíz, aplicando el middleware thunk y la integración con DevTools.
