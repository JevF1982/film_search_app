import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import Moviecard from "../Components/MovieCard";
import Grid from "@material-ui/core/Grid";

const FavoritesList = () => {
  const [movieDetails, setMovieDetails] = useState([]);

  const isAuthenticated = useSelector((auth) => auth.auth.isAuthenticated);

  const favList = useSelector(
    (favorites) => favorites.favorites.favList.favList
  );

  /////////////////////:Get favorite movies////////////////////////////

  const getList = useCallback(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    setMovieDetails([]);

    favList &&
      favList.map((id) =>
        fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_KEY}&language=en-US`,
          { signal: signal }
        )
          .then((response) => response.json())
          .then((movie) => {
            setMovieDetails((prevMovieDetails) => [...prevMovieDetails, movie]);
          })
          .catch((err) => console.log(err))
      );

    return function cleanup() {
      abortController.abort();
    };
  }, [favList]);

  useEffect(() => {
    setMovieDetails([]);
    getList();
  }, [getList]);

  return (
    <>
      <div id="favorite-header">
        <h1>Favorites</h1>
      </div>
      {!favList && isAuthenticated ? (
        <h3 style={{ color: "white", textAlign: "center" }}>
          -- NO FAVORITES YET --
        </h3>
      ) : (
        <Grid container style={{ display: "flex", justifyContent: "center" }}>
          {movieDetails &&
            movieDetails.map((movie, index) => {
              return (
                <Grid
                  item
                  xs={8}
                  sm={4}
                  lg={3}
                  style={{ margin: "10px" }}
                  key={index}
                >
                  <Moviecard
                    key={index}
                    path={movie.poster_path}
                    overview={movie.overview}
                    title={movie.title}
                    rating={movie.vote_average}
                    id={movie.id}
                    getList={getList}
                  />
                </Grid>
              );
            })}
        </Grid>
      )}
    </>
  );
};

export default FavoritesList;
