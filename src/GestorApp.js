import React from "react";
// Importa React para poder crear componentes funcionales.

import { Provider } from "react-redux";
// Importa el componente `Provider` de React-Redux que permite conectar Redux con React.

import { store } from "./store/store";
// Importa la "store" configurada de Redux desde el archivo correspondiente.

import { AppRouter } from "./router/AppRouter";
// Importa el enrutador principal de la aplicación, donde están definidas las rutas y vistas.

export const GestorApp = () => {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
};
// Define el componente principal `GestorApp`.
// Dentro de él:
// - `Provider` recibe la `store` y la pone disponible para toda la aplicación.
// - `AppRouter` contiene la lógica de rutas (navegación entre pantallas).
