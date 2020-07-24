import {
  POPULATE_MOVIELIST,
  MOVIE_LOADING,
  MOVIE_LOAD_ERROR,
  CLEAR_MOVIELIST,
  GET_MOVIE_DETAILS,
} from "../actions/types";

const initialState = {
  movieList: [],
  movieDetails: [],
  isLoading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case MOVIE_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case POPULATE_MOVIELIST:
      return {
        ...state,
        isLoading: false,
        movieList: action.payload,
      };
    case GET_MOVIE_DETAILS:
      return {
        ...state,
        isLoading: false,
        movieDetails: action.payload,
      };
    case MOVIE_LOAD_ERROR:
      return {
        ...state,
        isLoading: false,
      };
    case CLEAR_MOVIELIST:
      return {
        ...state,
        isLoading: false,
        movieList: [],
      };

    default:
      return state;
  }
}
