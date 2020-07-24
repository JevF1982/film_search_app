import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Moviecard from "../Components/MovieCard";
import SearchBar from "material-ui-search-bar";
import Grid from "@material-ui/core/Grid";
import { addMovies } from "../actions/movieActions";

const SearchField = () => {
  const [searchfield, setSearchField] = useState("");

  const dispatch = useDispatch();
  const movieList = useSelector((movielist) => movielist.movielist.movieList);

  const handleChange = (e) => {
    setSearchField(e);

    dispatch(addMovies(e));
  };

  return (
    <>
      <div id="search-bar">
        <SearchBar
          id="search-field"
          onChange={handleChange}
          value={searchfield}
          placeholder="Search for movies..."
          autoComplete="off"
        />
      </div>
      <Grid container style={{ display: "flex", justifyContent: "center" }}>
        {movieList.length
          ? movieList.map((movie, index) =>
              movie.poster_path && movie.overview && movie.vote_average ? (
                <Grid
                  item
                  xs={8}
                  sm={4}
                  lg={3}
                  style={{ margin: "10px" }}
                  key={index}
                >
                  <Moviecard
                    path={movie.poster_path}
                    overview={movie.overview}
                    title={movie.title}
                    rating={movie.vote_average}
                    id={movie.id}
                  />
                </Grid>
              ) : null
            )
          : null}
      </Grid>
    </>
  );
};

export default SearchField;
