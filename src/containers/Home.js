import React, { useCallback, useState, useEffect } from "react";
import styles from "../modules/container-modules/home-container.module.css";
import PosterSlider from "../components/PosterSlider";
import MovieContent from "../components/MovieContent";
import { useSelector, useDispatch } from "react-redux";
import {
  changeClickState,
  setClickedFalse,
  changeTvClickState,
  setTvClickedFalse
} from "../actions/PosterClickActions";
import axios from "axios";
import {
  movieUrls,
  imdbUrls,
  createContentDetails
} from "../exports/apiFetchFunctions";

export default function Home({ posterSliderInformation }) {
  // const [movieDetails, setMovieDetails] = useState([]);
  // const [movieReviews, setMovieReviews] = useState([]);
  const [contentState, setContentState] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const clickPosterState = useSelector(
    state => state.posterClickState.clickState
  );

  const tvClickPosterState = useSelector(
    state => state.posterClickState.tvClickState
  );

  /**
   * Pass in index of clicked state as well as the category string.
   */
  const dispatchClickState = useCallback(
    (i, item) => {
      return dispatch(changeClickState(i, item));
    },
    [dispatch]
  );

  // Tv click-state dispatch
  const dispatchTvClickState = useCallback(
    (i, item) => {
      return dispatch(changeTvClickState(i, item));
    },
    [dispatch]
  );

  /**
   * Will map through categories and
   */
  const setClickFalse = useCallback(
    arr => {
      return arr.map(cat => {
        return dispatch(setClickedFalse(cat));
      });
    },
    [dispatch]
  );

  //! set tv click false.
  const setTvClickFalse = useCallback(arr => {
    return arr.map(cat => {
      return dispatch(setTvClickedFalse(cat));
    });
  }, []);

  const createPosterSliderComponent = (title, data, status, category) => {
    return (
      <>
        <div
          className={
            title === "Top Rated" ? styles.topRatedTitle : styles.title
          }
        >
          {title}
        </div>
        <PosterSlider
          videoData={data}
          getPosterStatus={status}
          category={category}
        />
      </>
    );
  };

  useEffect(() => {
    posterSliderInformation.length === 3 &&
      createContentDetails(
        posterSliderInformation[0].details,
        clickPosterState.topRated.index,
        setContentState
      );
  }, [clickPosterState.topRated.index]);

  useEffect(() => {
    posterSliderInformation.length === 3 &&
      createContentDetails(
        posterSliderInformation[1].details,
        clickPosterState.popular.index,
        setContentState
      );
  }, [clickPosterState.popular.index]);

  useEffect(() => {
    posterSliderInformation.length === 3 &&
      createContentDetails(
        posterSliderInformation[2].details,
        clickPosterState.nowPlaying.index,
        setContentState
      );
  }, [clickPosterState.nowPlaying.index]);

  useEffect(() => {
    posterSliderInformation.length === 3 &&
      contentState !== null &&
      console.log(contentState);
  }, [clickPosterState.topRated.index]);

  useEffect(() => {
    posterSliderInformation.length === 3 &&
      console.log(posterSliderInformation[0].details);
  }, [posterSliderInformation.length === 3]);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h1 className={styles.mainTitle}>Trending Entertainment News</h1>
      {createPosterSliderComponent(
        "Top Rated",
        posterSliderInformation.length === 3 && posterSliderInformation[0],
        dispatchClickState,
        "topRated"
      )}
      <MovieContent
        posterStatus={clickPosterState.topRated}
        imdbInformation={contentState !== null && contentState.imdb.data}
        details={contentState !== null && contentState.details.data}
      />
      <PosterSlider
        videoData={
          posterSliderInformation.length === 3 && posterSliderInformation[1]
        }
        getPosterStatus={dispatchClickState}
        category={"popular"}
      />
      <MovieContent
        posterStatus={clickPosterState.popular}
        imdbInformation={contentState !== null && contentState.imdb.data}
        details={contentState !== null && contentState.details.data}
      />
      <PosterSlider
        videoData={
          posterSliderInformation.length === 3 && posterSliderInformation[2]
        }
        getPosterStatus={dispatchClickState}
        category={"nowPlaying"}
      />
      <MovieContent
        posterStatus={clickPosterState.nowPlaying}
        imdbInformation={contentState !== null && contentState.imdb.data}
        details={contentState !== null && contentState.details.data}
      />
    </div>
  );
}
