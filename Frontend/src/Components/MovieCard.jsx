import React, { useState, useEffect, useCallback } from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import FadeIn from "react-fade-in";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getMovieDetails } from "../actions/movieActions";
import { useLocation } from "react-router-dom";

import {
  addFavorites,
  deleteFavorites,
  getFavorites,
} from "../actions/favoriteAction";
import { AlertFunc } from "../Containers/AlertFunc";

const MovieCard = (props) => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((auth) => auth.auth.isAuthenticated);
  const userId = useSelector((auth) =>
    isAuthenticated ? auth.auth.user.id : null
  );
  const favList = useSelector(
    (favorites) => favorites.favorites.favList.favList
  );

  const [istoggled, setIsToggled] = useState(false);
  const [checked, setChecked] = useState(false);
  const [buttonValue, setButtonValue] = useState("");

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

    getCheckedValue(props.id);

    return () => {
      clearTimeout(timeout);
    };
  }, [istoggled, getCheckedValue, props.id]);

  const handleClick = (id) => {
    dispatch(getMovieDetails(id));
    history.push("/details");
  };

  const handleFavorites = (movieId, userId) => {
    dispatch(addFavorites(movieId, userId));
    dispatch(getFavorites(userId));
    setButtonValue("add");
    setIsToggled((prevIsToggled) => !prevIsToggled);
  };
  const handleDelete = async (movieId, userId) => {
    await dispatch(deleteFavorites(movieId, userId));
    dispatch(getFavorites(userId));
    setButtonValue("delete");
    setIsToggled((prevIsToggled) => !prevIsToggled);
  };

  return (
    <>
      <FadeIn>
        <Card
          style={{
            marginBottom: "90px",
            minHeight: "600px",
            backgroundColor: "rgb(25,25,25)",
          }}
        >
          <CardActionArea>
            <CardMedia
              component="img"
              alt="Movie Tile"
              width={200}
              height={300}
              image={` http://image.tmdb.org/t/p/w185//${props.path}`}
              title={props.title}
              style={{ objectFit: "scale-down" }}
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                style={{ color: "white" }}
                component="h2"
              >
                {props.title}
              </Typography>
              <Typography
                variant="body2"
                style={{ color: "white", marginBottom: "40px" }}
                component="h1"
              >
                Rating : {props.rating}/10
              </Typography>
            </CardContent>
          </CardActionArea>

          {AlertFunc(isAuthenticated, istoggled, buttonValue)}

          <CardActions style={{ display: "flex", justifyContent: "center" }}>
            {location.pathname !== "/favorites" ? (
              <div>
                <Checkbox
                  checked={checked || false}
                  color="secondary"
                  inputProps={{ "aria-label": "primary checkbox" }}
                />
                <Button
                  size="large"
                  color="primary"
                  className="moviecard-buttons"
                  onClick={() => handleFavorites(props.id, userId, "add")}
                >
                  Add to favorites
                </Button>{" "}
              </div>
            ) : null}
          </CardActions>
          <CardActions style={{ display: "flex", justifyContent: "center" }}>
            <Button
              size="large"
              color="primary"
              className="moviecard-buttons"
              onClick={() =>
                handleDelete(
                  props.id,
                  isAuthenticated ? userId : null,
                  "delete"
                )
              }
            >
              Delete from favorites
            </Button>
            <Button
              size="large"
              color="primary"
              className="moviecard-buttons"
              onClick={() => handleClick(props.id)}
            >
              Details
            </Button>
          </CardActions>
        </Card>
      </FadeIn>
    </>
  );
};

export default MovieCard;
