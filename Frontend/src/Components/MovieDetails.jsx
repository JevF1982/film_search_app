import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import { AlertFunc } from "../Containers/AlertFunc";
import {
  addFavorites,
  deleteFavorites,
  getFavorites,
} from "../actions/favoriteAction";

const MovieDetails = () => {
  const movie = useSelector((movie) => movie.movielist.movieDetails);
  const isAuthenticated = useSelector((auth) => auth.auth.isAuthenticated);
  const userId = useSelector((auth) =>
    isAuthenticated ? auth.auth.user.id : null
  );
  const favList = useSelector(
    (favorites) => favorites.favorites.favList.favList
  );
  const [istoggled, setIsToggled] = useState(false);
  const dispatch = useDispatch();
  const [buttonValue, setButtonValue] = useState("");
  const [checked, setChecked] = useState(false);

  const getCheckedValue = useCallback(
    (movieId) => {
      setChecked(favList && favList.includes(movieId));
    },
    [favList]
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsToggled(false);
    }, 2000);
    getCheckedValue(movie.id);
    return () => {
      clearTimeout(timeout);
    };
  }, [istoggled, getCheckedValue, movie.id]);

  const handleFavorites = async (movieId, userId, e) => {
    setIsToggled((prevIsToggled) => !prevIsToggled);
    if (e === "add") {
      await dispatch(addFavorites(movieId, userId));
      dispatch(getFavorites(userId));
      setButtonValue("add");
    } else {
      setButtonValue("delete");
      await dispatch(deleteFavorites(movieId, userId));
      dispatch(getFavorites(userId));
    }
  };

  const movieStyle = {
    background: {
      backgroundImage: `url(https://image.tmdb.org/t/p/w185//${movie.poster_path})`,
      maxWidth: "40vh",
      minHeight: "300px ",
      backgroundRepeat: "no-repeat",

      backgroundPosition: "left",
      backgroundSize: "contain",
      flexGrow: 2,
    },

    container: {
      display: "flex",
      width: "100vw",
      justifyContent: "center",
      margin: "50px 0 50px 0",
    },
    movieOverview: {
      color: "white",
      fontSize: "1.4em",

      minWidth: "auto",
      margin: "20px",
    },
    movieContentContainer: {
      display: "flex",
      padding: "20px",
      margin: "30px",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
  };

  return (
    <>
      <div className="movie-container" style={movieStyle.container}>
        <div className="movie-background" style={movieStyle.background}>
          <div className="overlay" style={movieStyle.overlay}></div>
        </div>
        <div style={movieStyle.movieContentContainer}>
          <div style={movieStyle.movieOverview}>{movie.overview}</div>
          <div style={movieStyle.movieOverview}>
            {movie.vote_average ? `RATING : ${movie.vote_average}/10` : null}
          </div>

          {
            /// call alert function
            AlertFunc(isAuthenticated, istoggled, buttonValue)
          }
          <div style={movieStyle.movieOverview}>
            {isAuthenticated ? (
              <div>
                <Checkbox
                  checked={checked || false}
                  color="secondary"
                  inputProps={{ "aria-label": "primary checkbox" }}
                />
                {!checked ? (
                  <Button
                    disabled={checked || false}
                    variant="contained"
                    size="small"
                    color="primary"
                    className="moviecard-buttons"
                    onClick={() => handleFavorites(movie.id, userId, "add")}
                  >
                    Add to favorites
                  </Button>
                ) : (
                  <Button
                    size="small"
                    color="secondary"
                    disabled={!checked || false}
                    variant="contained"
                    className="moviecard-buttons"
                    onClick={() =>
                      handleFavorites(
                        movie.id,
                        isAuthenticated ? userId : null,
                        "delete"
                      )
                    }
                  >
                    Delete from favorites
                  </Button>
                )}
              </div>
            ) : (
              <h4
                style={{
                  color: "yellow",
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                Log in or register to add to your favorite list
              </h4>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieDetails;
