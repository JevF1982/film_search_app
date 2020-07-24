import favoriteReducer from "./favoriteReducer";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import movieReducer from "./movieReducer";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  favorites: favoriteReducer,
  error: errorReducer,
  auth: authReducer,
  movielist: movieReducer,
});

export default allReducers;
