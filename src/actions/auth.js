import { fetchSinToken, fetchConToken } from "../helpers/fetch";
import { types } from "../types/types";

export const startLogin = (email, password) => {
  return async (dispatch) => {
    try {
      const resp = await fetchSinToken("auth", { email, password }, "POST");
      const body = await resp.json();

      if (body.ok) {
        localStorage.setItem("token", body.token);
        localStorage.setItem("token-init-date", new Date().getTime());
        dispatch(
          login({
            uid: body.uid,
            name: body.name,
          })
        );
        return { payload: { uid: body.uid } }; // Éxito
      } else {
        return { error: { message: body.msg } }; // Error del servidor
      }
    } catch (error) {
      return { error: { message: "Error de conexión" } }; // Error de red
    }
  };
};

export const startRegister = (email, password, name) => {
  return async (dispatch) => {
    try {
      const resp = await fetchSinToken(
        "auth/new",
        { email, password, name },
        "POST"
      );
      const body = await resp.json();

      if (body.ok) {
        localStorage.setItem("token", body.token);
        localStorage.setItem("token-init-date", new Date().getTime());
        dispatch(
          login({
            uid: body.uid,
            name: body.name,
          })
        );
        return { payload: { uid: body.uid } };
      } else {
        return { error: { message: body.msg } };
      }
    } catch (error) {
      return { error: { message: "Error de conexión" } };
    }
  };
};

const login = (user) => ({
  type: types.authLogin,
  payload: user,
});

export const startLogout = () => {
  return (dispatch) => {
    localStorage.clear();
    dispatch({ type: types.authLogout });
  };
};
export const startChecking = () => {
  return async (dispatch) => {
    const resp = await fetchConToken("auth/renew");
    const body = await resp.json();

    if (body.ok) {
      localStorage.setItem("token", body.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(
        login({
          uid: body.uid,
          name: body.name,
        })
      );
    } else {
      dispatch(checkingFinish());
    }
  };
};

const checkingFinish = () => ({
  type: types.authChekingFinish,
});
