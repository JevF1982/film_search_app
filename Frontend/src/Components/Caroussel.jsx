import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router";
import { getMovieDetails } from "../actions/movieActions";

const responsive = {
  desktop: {
    breakpoint: {
      max: 3000,
      min: 1024,
    },
    items: 6,
    partialVisibilityGutter: 20,
  },
  mobile: {
    breakpoint: {
      max: 464,
      min: 0,
    },
    items: 2,
    partialVisibilityGutter: 20,
  },
  tablet: {
    breakpoint: {
      max: 1024,
      min: 464,
    },
    items: 3,
    partialVisibilityGutter: 20,
  },
};

const Caroussel = () => {
  const [favList, setFavList] = useState([]);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_KEY}&language=en-US&page=1`
      );

      const recentList = await result.data.results.map((item) => item);

      setFavList(recentList);
    };
    fetchData();
  }, []);

  const handleClick = (id) => {
    dispatch(getMovieDetails(id));
    history.push("/details");
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1 style={{ marginBottom: "60px" }}>NEW RELEASES</h1>
      </div>
      <Carousel
        additionalTransfrom={0}
        arrows
        responsive={responsive}
        autoPlaySpeed={1500}
        centerMode={false}
        className=""
        containerClass="container-with-dots"
        dotListClass=""
        draggable
        focusOnSelect={false}
        infinite
        partialVisible
        autoPlay={true}
        itemClass=""
        keyBoardControl
        minimumTouchDrag={80}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        showDots={false}
        sliderClass=""
        slidesToSlide={1}
        swipeable
      >
        {favList.map((item) => {
          return item.poster_path ? (
            <Grid container spacing={1} key={item.id}>
              <Grid item xs={12}>
                <img
                  src={`http://image.tmdb.org/t/p/w185//${item.poster_path}`}
                  alt="pic"
                  id="img-card"
                  onClick={() => handleClick(item.id)}
                />
              </Grid>
            </Grid>
          ) : null;
        })}
      </Carousel>
      ;
    </>
  );
};

export default Caroussel;
