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
import {
  createContentDetails
} from "../exports/apiFetchFunctions";

export default function Home({ posterSliderInformation, tvPosterSliderInformation }) {
  const [contentState, setContentState] = useState(null);
  const [tvContentState, setTvContentState] = useState(null);
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

 // Function to map through 
  const setClickFalse = useCallback(
    arr => {
      return arr.map(cat => {
        return dispatch(setClickedFalse(cat));
      });
    },
    [setClickedFalse]
  );

  //! set tv click false.
  const setTvClickFalse = useCallback(arr => {
    return arr.map(cat => {
      return dispatch(setTvClickedFalse(cat));
    });
  }, []);

  
  //TODO: CREATE OWN COMPONENT AND PASS ARGUMENTS AS PROPS.
  const createPosterSliderComponent = (title, data, status, category, format) => {
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
          format={format}
        />
      </>
    );
  };

  // Movie Click-state categories.
  const category = {
    topRated: ["popular", "upcoming", "nowPlaying"],
    popular: ["upcoming", "topRated", "nowPlaying"],
    upcoming: ["popular", "topRated", "nowPlaying"],
    nowPlaying: ["topRated", "popular", "upcoming"]
  };

  //TV Click-state categories.
  const category2 = {
    topRated: ["popular", "airing"],
    popular: ["airing", "topRated"],
    airing: ["popular", "topRated"]
  };

  const arr = [
    {category: 'topRated', index: 0},
    {category: 'popular', index: 1},
    {category: 'nowPlaying', index: 2}
  ]

  const arr2 = [
    {category: 'topRated', index: 0},
    {category: 'popular', index: 1},
    {category: 'airing', index: 2}
  ]

  const mapCreateContentDetails = (index, category) => {
    posterSliderInformation.length === 3 &&
      createContentDetails(
        posterSliderInformation[index].details,
        setContentState,
        clickPosterState[category].index
      );
  }

  const mapTvCreateContentDetails = (index, category) => {
    tvPosterSliderInformation.length === 3 &&
      createContentDetails(
        tvPosterSliderInformation[index].details,
        setTvContentState,
        tvClickPosterState[category].index
      );
  }

  // This will take in the category 
  const effects = (cat, cat2) => {
    if (cat.clicked) {
      setClickFalse(cat2);
    }
    return () => {
      console.log("unmounted");
    };
  };

  const tvEffects = (cat, cat2) => {
    if (cat.clicked) {
      setTvClickFalse(cat2);
    }
    return () => {
      console.log("unmounted");
    };
  };

  const mapClickState = (obj, func, state) => {
    const mapState = Object.keys(obj).map(data => {
      return state[data].clicked;
    });
    return mapState.forEach((data, index) => {
      if (data) {
        return dispatch(func(Object.keys(obj)[index]));
      }
    });
  };


  //Movie click-state effects
  useEffect(() => {
    effects(clickPosterState.topRated, category.topRated);
    clickPosterState.topRated.clicked &&
      mapClickState(category2, setTvClickedFalse, tvClickPosterState);
    return () => {
      console.log('Poster-click state unmounted.')
    }
  }, [clickPosterState.topRated.clicked]);

  useEffect(() => {
    effects(clickPosterState.popular, category.popular);
    clickPosterState.popular.clicked &&
      mapClickState(category2, setTvClickedFalse, tvClickPosterState);
    return () => {
      console.log('Poster-click state unmounted.')
    }
  }, [clickPosterState.popular.clicked]);

  useEffect(() => {
    effects(clickPosterState.nowPlaying, category.nowPlaying);
    clickPosterState.nowPlaying.clicked &&
      mapClickState(category2, setTvClickedFalse, tvClickPosterState);
    return () => {
      console.log('Poster-click state unmounted.')
    }
  }, [clickPosterState.nowPlaying.clicked]);


  //TV click-state effects
  useEffect(() => {
    tvEffects(tvClickPosterState.topRated, category2.topRated);
    tvClickPosterState.topRated.clicked &&
      mapClickState(category, setClickedFalse, clickPosterState);
    return () => {
      console.log('tv-click state unmounted.')
    }
  }, [tvClickPosterState.topRated.clicked]);

  useEffect(() => {
    tvEffects(tvClickPosterState.popular, category2.popular);
    tvClickPosterState.popular.clicked &&
      mapClickState(category, setClickedFalse, clickPosterState);
    return () => {
      console.log('tv-click state unmounted.')
    }
  }, [tvClickPosterState.popular.clicked]);

  useEffect(() => {
    tvEffects(tvClickPosterState.airing, category2.airing);
    tvClickPosterState.airing.clicked &&
      mapClickState(category, setClickedFalse, clickPosterState);
    return () => {
      console.log('tv-click state unmounted.')
    }
  }, [tvClickPosterState.airing.clicked]);


  // Dependencies for poster click effects.
  // Will only run if the poster click index or clicked bool changes. 
  const checkState = (cat, index, state) => {    
    return state[cat].index ||
    state[cat].clicked ||
    arr[index].index ||
    arr[index].category
  }


  // Gather MOVIE details
  useEffect(() => {    
    mapCreateContentDetails(arr[0].index, arr[0].category);
  }, [checkState('topRated', 0, clickPosterState)]);

  useEffect(() => {
    mapCreateContentDetails(arr[1].index, arr[1].category);
  }, [checkState('popular', 1, clickPosterState)]);

  useEffect(() => {
    mapCreateContentDetails(arr[2].index, arr[2].category);
  }, [checkState('nowPlaying', 2, clickPosterState)]);


  // Gather TV details
  useEffect(() => {    
    mapTvCreateContentDetails(arr2[0].index, arr2[0].category);
  }, [checkState('topRated', 0, tvClickPosterState)]);

  useEffect(() => {
    mapTvCreateContentDetails(arr2[1].index, arr2[1].category);
  }, [checkState('popular', 1, tvClickPosterState)]);

  useEffect(() => {
    mapTvCreateContentDetails(arr2[2].index, arr2[2].category);
  }, [checkState('airing', 2, tvClickPosterState)]);

  useEffect(() => {
    tvPosterSliderInformation.length === 3 &&
      tvContentState  &&
      console.log(tvContentState);
  }, [tvClickPosterState.topRated.index]);

  // useEffect(() => {
  //   posterSliderInformation.length === 3 &&
  //     console.log(posterSliderInformation[0].details);
  // }, [posterSliderInformation.length === 3]);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h1 className={styles.mainTitle}>Trending Entertainment News</h1>
      <h1>Movie Categories</h1>
      {createPosterSliderComponent(
        "Top Rated",
        posterSliderInformation.length === 3 && posterSliderInformation[0],
        dispatchClickState,
        "topRated",
        'movie'
      )}
      
      <MovieContent
        posterStatus={clickPosterState.topRated}
        imdbInformation={contentState  && contentState.imdb.data}
        details={contentState  && contentState.details.data}
      />
      {createPosterSliderComponent(
        "Popular",
        posterSliderInformation.length === 3 && posterSliderInformation[1],
        dispatchClickState,
        "popular",
        'movie'
      )}
      <MovieContent
        posterStatus={clickPosterState.popular}
        imdbInformation={contentState  && contentState.imdb.data}
        details={contentState  && contentState.details.data}
      />
      {createPosterSliderComponent(
        "Now Playing",
        posterSliderInformation.length === 3 && posterSliderInformation[2],
        dispatchClickState,
        "nowPlaying",
        'movie'
      )}
      <MovieContent
        posterStatus={clickPosterState.nowPlaying}
        imdbInformation={contentState  && contentState.imdb.data}
        details={contentState  && contentState.details.data}
      />

      
      <h1>TV Categories</h1>
      {createPosterSliderComponent(
        "Top Rated",
        tvPosterSliderInformation.length === 3 && tvPosterSliderInformation[0],
        dispatchTvClickState,
        "topRated",
        'tv'
      )}
      <MovieContent
        posterStatus={tvClickPosterState.topRated}
        imdbInformation={tvContentState  && tvContentState.imdb.data}
        details={tvContentState  && tvContentState.details.data}
      />
      {createPosterSliderComponent(
        "Popular",
        tvPosterSliderInformation.length === 3 && tvPosterSliderInformation[1],
        dispatchTvClickState,
        "popular",
        'tv'
      )}
      <MovieContent
        posterStatus={tvClickPosterState.popular}
        imdbInformation={tvContentState  && tvContentState.imdb.data}
        details={tvContentState  && tvContentState.details.data}
      />
      {createPosterSliderComponent(
        "Now Airing",
        tvPosterSliderInformation.length === 3 && tvPosterSliderInformation[2],
        dispatchTvClickState,
        "airing",
        'tv'
      )}
      <MovieContent
        posterStatus={tvClickPosterState.airing}
        imdbInformation={tvContentState  && tvContentState.imdb.data}
        details={tvContentState  && tvContentState.details.data}
      />
    </div>
  );
}
