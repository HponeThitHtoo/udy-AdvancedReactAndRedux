import axios from "axios";

import { AUTH_USER, AUTH_ERROR } from "./types";

/* export const signup = ({ email, password }) => (dispatch) => {
  axios.post('http://localhost:3090/signup', {email, password});
}; */
export const signup = (formProps, callback) => async (dispatch) => {
  try {
    const respone = await axios.post("http://localhost:3090/signup", formProps);

    dispatch({ type: AUTH_USER, payload: respone.data.token });
    localStorage.setItem("token", respone.data.token);
    callback();
  } catch (error) {
    dispatch({ type: AUTH_ERROR, payload: "Email in use" });
  }
};

export const signin = (formProps, callback) => async (dispatch) => {
  try {
    const respone = await axios.post("http://localhost:3090/signin", formProps);

    dispatch({ type: AUTH_USER, payload: respone.data.token });
    localStorage.setItem("token", respone.data.token);
    callback();
  } catch (error) {
    dispatch({ type: AUTH_ERROR, payload: "Invalid login credentials" });
  }
};

export const signout = () => {
  localStorage.removeItem("token");

  return {
    type: AUTH_USER,
    payload: "",
  };
};
