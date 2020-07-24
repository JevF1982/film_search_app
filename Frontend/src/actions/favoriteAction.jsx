import {
  ADD_FAVORITE,
  FAVORITES_ERROR,
  FAVORITES_LOADING,
  GET_FAVORITES,
  DELETE_FAVORITE,
  LOADED_FAVORITES,
} from "./types";
import { returnErrors } from "./errorActions";
import { tokenConfig } from "../actions/tokenConfig";

import axios from "axios";

export const addFavorites = (favList, UserId) => async (dispatch, getState) => {
  dispatch({ type: FAVORITES_LOADING });

  const body = JSON.stringify({ favList, UserId });

  await axios
    .patch(`/api/favorites/${UserId}`, body, tokenConfig(getState))
    .then(() =>
      dispatch({
        type: ADD_FAVORITE,
        payload: favList,
      })
    )
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "FAVORITES_ERROR")
      );
      dispatch({
        type: FAVORITES_ERROR,
      });
    });
};

export const deleteFavorites = (favList, UserId) => async (
  dispatch,
  getState
) => {
  dispatch({ type: FAVORITES_LOADING });

  const body = JSON.stringify({ favList, UserId });

  await axios
    .patch(
      `/api/favorites/deletefavorites/${UserId}`,
      body,
      tokenConfig(getState)
    )
    .then(() =>
      dispatch({
        type: DELETE_FAVORITE,
        payload: favList,
      })
    )
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "FAVORITES_ERROR")
      );
      dispatch({
        type: FAVORITES_ERROR,
      });
    });
};

export const getFavorites = (UserId) => async (dispatch, getState) => {
  dispatch({ type: FAVORITES_LOADING });

  await axios
    .get(`/api/favorites/getfavorites/${UserId}`, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: GET_FAVORITES,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "FAVORITES_ERROR")
      );
      dispatch({
        type: FAVORITES_ERROR,
      });
    });

  await dispatch({
    type: LOADED_FAVORITES,
  });
};
