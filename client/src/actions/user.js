import jwtDecode from "jwt-decode";

import { LOGIN, REGISTER } from "../constants/actionTypes";
import * as api from "../api/index";
import { GET_CURRENT_USER } from "../constants/actionTypes";

export const register = (formData, history) => async (dispatch) => {
  try {
    const response = await api.register(formData);
    const jwt = response.headers["x-auth-token"];
    dispatch({ type: REGISTER, jwt });

    history.push("/");
  } catch (error) {
    console.log(error);
  }
};

export const login = (formData) => async (dispatch) => {
  try {
    const { data: jwt } = await api.login(formData);

    dispatch({ type: LOGIN, jwt });

    window.location = "/";
  } catch (error) {
    console.log(error);
  }
};

export const getCurrentUser = () => {
  const jwt = localStorage.getItem("token");
  if (jwt) {
    const user = jwtDecode(jwt);
    return { type: GET_CURRENT_USER, user };
  } else {
    return { type: GET_CURRENT_USER, user: null };
  }
};
