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
// import { useEffect } from "react";

const store = createStore(
  allReducers,
  composeWithDevTools(applyMiddleware(thunk))
);

function App() {
  // const userId = useSelector((auth) =>
  //   auth.isAuthenticated ? auth.auth.user.id : null
  // );
  // useEffect(() => {
  //   store.dispatch(loadUser());
  //   store.dispatch(getFavorites(userId));
  // }, []);
  return (
    <Provider store={store}>
      <div className="App">
        <RouterPage />
      </div>
    </Provider>
  );
}

export default App;
