import {
  ADD_FAVORITE,
  DELETE_FAVORITE,
  GET_FAVORITES,
  FAVORITES_ERROR,
  FAVORITES_LOADING,
  LOADED_FAVORITES,
  CLEAR_FAVORITES,
} from "../actions/types";

const initialState = {
  favList: [],
  isLoading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_FAVORITE:
      return {
        ...state,
        isLoading: false,
      };
    case FAVORITES_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case LOADED_FAVORITES:
      return {
        ...state,
        isLoading: false,
      };
    case DELETE_FAVORITE:
      return {
        ...state,
        isLoading: false,
      };
    case FAVORITES_ERROR:
      return {
        ...state,
        isLoading: false,
      };
    case CLEAR_FAVORITES:
      return {
        ...state,
        isLoading: false,
        favList: [],
      };
    case GET_FAVORITES:
      return {
        ...state,
        isLoading: true,
        favList: action.payload,
      };

    default:
      return state;
  }
}
