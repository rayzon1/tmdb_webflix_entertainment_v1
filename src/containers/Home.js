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
import { movieUrls } from "../exports/apiFetchFunctions";

export default function Home({ posterSliderInformation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [movieDetails, setMovieDetails] = useState([]);

  const dispatch = useDispatch();

  const createMovieContentDetails = (obj, func) => {
    const detailObj = [];
    obj.data.results.forEach((data, index) => {
      const details = axios.get(movieUrls(data.id, "movie"));
      details.then(data => {
        detailObj.push(data);
      });
    });
    func(prev => [...prev, detailObj]);
  };

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

  useEffect(() => {
    posterSliderInformation.length === 3 &&
      Promise.all([
        createMovieContentDetails(posterSliderInformation[0], setMovieDetails),
        createMovieContentDetails(posterSliderInformation[1], setMovieDetails),
        createMovieContentDetails(posterSliderInformation[2], setMovieDetails),
      ]);
  }, [posterSliderInformation]);

  useEffect(() => {
    movieDetails.length > 0 && console.log(movieDetails);
  }, [movieDetails]);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h1 className={styles.mainTitle}>Trending Entertainment News</h1>
      <PosterSlider
        videoData={
          posterSliderInformation.length === 3 && posterSliderInformation[0]
        }
        getPosterStatus={dispatchClickState}
        category={"topRated"}
      />
      <PosterSlider
        videoData={
          posterSliderInformation.length === 3 && posterSliderInformation[1]
        }
        getPosterStatus={dispatchClickState}
        category={"popular"}
      />
      <PosterSlider
        videoData={
          posterSliderInformation.length === 3 && posterSliderInformation[2]
        }
        getPosterStatus={dispatchClickState}
        category={"nowPlaying"}
      />
    </div>
  );
}
