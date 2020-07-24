import React from "react";
import "./App.scss";

import { createStore, applyMiddleware } from "redux";
import allReducers from "./reducers";
import { Provider } from "react-redux";
// import { loadUser } from "./actions/authActions";
// import { getFavorites } from "./actions/favoriteAction";
import { composeWithDevTools } from "redux-devtools-extension";

import thunk from "redux-thunk";
import RouterPage from "./Components/RouterPage";

const store = createStore(
  allReducers,
  composeWithDevTools(applyMiddleware(thunk))
);

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <RouterPage />
      </div>
    </Provider>
  );
}

export default App;
