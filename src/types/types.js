export const types = {
  // Exporta un objeto con todos los tipos de acciones que se usarán en la aplicación Redux.

  uiOpenModal: "[ui]Open Modal",
  // Tipo de acción para abrir el modal en la interfaz de usuario.

  uiCloseModal: "[ui]Close Modal",
  // Tipo de acción para cerrar el modal (aunque no está manejado aún en el reducer mostrado anteriormente).

  authChekingFinish: "[auth] Finish cheking login state",
  // Tipo de acción que indica que se ha terminado de verificar si el usuario está autenticado o no.

  authStartLogin: "[auth] Start login",
  // Tipo de acción que puede usarse para indicar el inicio del proceso de login (por ejemplo, para mostrar un spinner).

  authLogin: "[auth] Login",
  // Tipo de acción que se dispara cuando el usuario inicia sesión correctamente.

  authStartRegister: "[auth] Start Register",
  // Tipo de acción para indicar que se está empezando el proceso de registro de un nuevo usuario.

  authStartToeknRenew: "[auth] Start token renew",
  // Tipo de acción para iniciar la renovación del token de sesión del usuario (hay un error tipográfico: "Toekn" debería ser "Token").

  authLogout: "[auth] Logout",
  // Tipo de acción que se dispara cuando el usuario cierra sesión.
};
