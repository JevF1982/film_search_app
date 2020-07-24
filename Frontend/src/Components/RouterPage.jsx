import React from "react";
import Login from "../Components/Login";
import Register from "../Components/Register";
import NavBar from "../Containers/NavBar";
import Caroussel from "../Components/Caroussel";
import SearchField from "../Components/SearchField";
import MovieDetails from "../Components/MovieDetails";
import FavoritesList from "../Components/FavoritesList";
import ProtectedRoute from "../Components/ProtectedRoute";
import Unauthorized from "../Components/Unauthorized";
import { Alert } from "@material-ui/lab";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";

export default function RouterPage() {
  const auth = useSelector((auth) => auth.auth);
  const alert = auth.isAuthenticated;
  const [toggle, setToggle] = useState(alert);
  const isLoading = useSelector((favorites) => favorites.favorites.isLoading);

  useEffect(() => {
    setTimeout(() => {
      setToggle(!alert);
    }, 3000);
  }, [alert]);

  return (
    <Router>
      <Route path="/" component={NavBar} />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {auth.user ? (
          toggle ? (
            <Alert
              className="Alert"
              severity="success"
              elevation={1}
              variant="filled"
            >
              {`Welcome ${auth.user.name} ... you can now add movies to your favorites `}
            </Alert>
          ) : null
        ) : null}
        {!auth.user ? (
          !toggle ? (
            <Alert
              className="Alert"
              severity="error"
              elevation={1}
              variant="filled"
            >
              {`you are logged out `}
            </Alert>
          ) : null
        ) : null}
      </div>
      <Route exact path="/" component={SearchField} />
      <ProtectedRoute
        exact
        path="/favorites"
        isAuthenticated={auth.isAuthenticated}
        component={FavoritesList}
      />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/details" component={MovieDetails} />
      <Route exact path="/unauthorized" component={Unauthorized} />
      <Route path="/" component={Caroussel} />
    </Router>
  );
}
