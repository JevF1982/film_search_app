import {
  POPULATE_MOVIELIST,
  MOVIE_LOADING,
  MOVIE_LOAD_ERROR,
  CLEAR_MOVIELIST,
  GET_MOVIE_DETAILS,
} from "./types";

import { returnErrors } from "./errorActions";

import axios from "axios";

export const addMovies = (searchfield) => (dispatch) => {
  // movie loading
  dispatch({ type: MOVIE_LOADING });

  // fetch movies

  axios
    .get(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_KEY}&query=${searchfield}`
    )
    .then((res) =>
      dispatch({
        type: POPULATE_MOVIELIST,
        payload: res.data.results,
      })
    )
    .catch((err) => {
      dispatch({ type: CLEAR_MOVIELIST });
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: MOVIE_LOAD_ERROR,
      });
    });
};

export const getMovieDetails = (id) => (dispatch) => {
  // movie loading
  dispatch({ type: MOVIE_LOADING });

  // fetch movies

  axios
    .get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_KEY}&language=en-US`
    )
    .then((res) =>
      dispatch({
        type: GET_MOVIE_DETAILS,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: MOVIE_LOAD_ERROR,
      });
    });
};
