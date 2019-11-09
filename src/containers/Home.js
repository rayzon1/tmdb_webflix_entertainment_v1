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

  const category = {
    topRated: ["popular", "upcoming", "nowPlaying"],
    popular: ["upcoming", "topRated", "nowPlaying"],
    upcoming: ["popular", "topRated", "nowPlaying"],
    nowPlaying: ["topRated", "popular", "upcoming"]
  };

  const arr = [
    {category: 'topRated', index: 0},
    {category: 'popular', index: 1},
    {category: 'nowPlaying', index: 2}
  ]

  const mapCreateContentDetails = (index, category) => {
    posterSliderInformation.length === 3 &&
      createContentDetails(
        posterSliderInformation[index].details,
        setContentState,
        clickPosterState[category].index
      );
  }

  const effects = (cat, cat2) => {
    if (cat.clicked) {
      setClickFalse(cat2);
    }
    return () => {
      console.log("unmounted");
    };
  };

  useEffect(() => {
    effects(clickPosterState.topRated, category.topRated);
    return () => {
      console.log('Poster-click state unmounted.')
    }
  }, [clickPosterState.topRated.clicked]);

  useEffect(() => {
    effects(clickPosterState.popular, category.popular);
    return () => {
      console.log('Poster-click state unmounted.')
    }
  }, [clickPosterState.popular.clicked]);

  useEffect(() => {
    effects(clickPosterState.nowPlaying, category.nowPlaying);
    return () => {
      console.log('Poster-click state unmounted.')
    }
  }, [clickPosterState.nowPlaying.clicked]);



  useEffect(() => {    
    mapCreateContentDetails(arr[0].index, arr[0].category);
  }, [clickPosterState.topRated.index || clickPosterState.topRated.clicked]);

  useEffect(() => {
    mapCreateContentDetails(arr[1].index, arr[1].category);
  }, [clickPosterState.popular.index || clickPosterState.popular.clicked]);

  useEffect(() => {
    mapCreateContentDetails(arr[2].index, arr[2].category);
  }, [clickPosterState.nowPlaying.index || clickPosterState.nowPlaying.clicked]);

  // useEffect(() => {
  //   posterSliderInformation.length === 3 &&
  //     contentState !== null &&
  //     console.log(contentState);
  // }, [clickPosterState.topRated.index]);

  // useEffect(() => {
  //   posterSliderInformation.length === 3 &&
  //     console.log(posterSliderInformation[0].details);
  // }, [posterSliderInformation.length === 3]);

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
