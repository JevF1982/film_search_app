import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCES,
  LOGIN_FAIL,
  REGISTER_SUCCES,
  REGISTER_FAIL,
} from "./types";

import { returnErrors } from "./errorActions";
import { tokenConfig } from "../actions/tokenConfig";
import axios from "axios";

// check token and load user
export const loadUser = () => (dispatch, getState) => {
  // User loading
  dispatch({ type: USER_LOADING });

  // fetch user

  axios
    .get("/api/users/user", tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR,
      });
    });
};

// Register User///
export const registeruser = ({ name, email, password }) => (dispatch) => {
  //headers
  const config = {
    headers: { "Content-Type": "application/json" },
  };

  // request body

  const body = JSON.stringify({ name, email, password });

  axios
    .post("/api/users/register", body, config)
    .then((res) =>
      dispatch({
        type: REGISTER_SUCCES,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
      );
      dispatch({
        type: REGISTER_FAIL,
      });
    });
};

////////////////////////////////////////////////////: LOGIN USER /////////////////////////////////////////////////

export const loginuser = ({ email, password }) => (dispatch) => {
  //headers
  const config = {
    headers: { "Content-Type": "application/json" },
  };

  // request body

  const body = JSON.stringify({ email, password });

  axios
    .post("/api/users/login", body, config)
    .then((res) =>
      dispatch({
        type: LOGIN_SUCCES,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
      );

      dispatch({
        type: LOGIN_FAIL,
      });
    });
};
