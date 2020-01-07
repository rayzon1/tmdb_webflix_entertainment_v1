import React, { useState, useEffect } from "react";
import styles from "../modules/container-modules/home-container.module.css";
import MovieContent from "../components/MovieContent";
import { useSelector, useDispatch } from "react-redux";
import {
  changeClickState,
  setClickedFalse,
  changeTvClickState,
  setTvClickedFalse
} from "../actions/PosterClickActions";
import {
  createContentDetails,
  createNewsInformationDetails
} from "../exports/apiFetchFunctions";
import CreatePosterSliderComponent from "../components/helpers/CreatePosterSlider";
import filmReel from "../images/film-reel.png";
import tvIcon from "../images/tv-icon.png";
import CarouselHead from "../components/Carousel";
import LoadingSpinner from "../components/LoadingSpinner";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import SimpleMenu from "../components/AccountMenu";
import PaperSection from "../components/PaperSection";
import { movieQuotes } from "../quoteData";

export default function Home({
  posterSliderInformation,
  tvPosterSliderInformation,
  toggleDrawer,
  loggedInUser,
  setLoggedInUser
}) {
  // This state will hold the information object of movie details to display.
  const [contentState, setContentState] = useState(null);
  // This will hold the tv information object state.
  const [tvContentState, setTvContentState] = useState(null);
  const [movieNews, setMovieNews] = useState([]);

  //!Simple menu click state
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const dispatch = useDispatch();

  const clickPosterState = useSelector(
    state => state.posterClickState.clickState
  );

  const tvClickPosterState = useSelector(
    state => state.posterClickState.tvClickState
  );

  // Pass in index of clicked state as well as the category string.
  // Sends dispatch to Redux store.
  // Movie click-state dispatch.
  const dispatchClickState = (i, item) => {
    return dispatch(changeClickState(i, item));
  };

  // Tv click-state dispatch
  const dispatchTvClickState = (i, item) => {
    return dispatch(changeTvClickState(i, item));
  };

  // Set click false state.
  // Set movie click false.
  const setClickFalse = arr => {
    arr.map(cat => {
      return dispatch(setClickedFalse(cat));
    });
  };

  // Set tv click false.
  const setTvClickFalse = arr => {
    arr.map(cat => {
      return dispatch(setTvClickedFalse(cat));
    });
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
    { category: "topRated", index: 0 },
    { category: "popular", index: 1 },
    { category: "nowPlaying", index: 2 }
  ];

  const arr2 = [
    { category: "topRated", index: 0 },
    { category: "popular", index: 1 },
    { category: "airing", index: 2 }
  ];

  const mapCreateContentDetails = (index, category) => {
    posterSliderInformation.length === 3 &&
      createContentDetails(
        posterSliderInformation[index].details,
        setContentState,
        clickPosterState[category].index
      );
  };

  const mapTvCreateContentDetails = (index, category) => {
    tvPosterSliderInformation.length === 3 &&
      createContentDetails(
        tvPosterSliderInformation[index].details,
        setTvContentState,
        tvClickPosterState[category].index
      );
  };

  // This will take in the category clicked and set
  // false to secondary category.
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
  }, [clickPosterState.topRated.clicked]);

  useEffect(() => {
    effects(clickPosterState.popular, category.popular);
    clickPosterState.popular.clicked &&
      mapClickState(category2, setTvClickedFalse, tvClickPosterState);
  }, [clickPosterState.popular.clicked]);

  useEffect(() => {
    effects(clickPosterState.nowPlaying, category.nowPlaying);
    clickPosterState.nowPlaying.clicked &&
      mapClickState(category2, setTvClickedFalse, tvClickPosterState);
  }, [clickPosterState.nowPlaying.clicked]);

  //TV click-state effects
  useEffect(() => {
    tvEffects(tvClickPosterState.topRated, category2.topRated);
    tvClickPosterState.topRated.clicked &&
      mapClickState(category, setClickedFalse, clickPosterState);
  }, [tvClickPosterState.topRated.clicked]);

  useEffect(() => {
    tvEffects(tvClickPosterState.popular, category2.popular);
    tvClickPosterState.popular.clicked &&
      mapClickState(category, setClickedFalse, clickPosterState);
  }, [tvClickPosterState.popular.clicked]);

  useEffect(() => {
    tvEffects(tvClickPosterState.airing, category2.airing);
    tvClickPosterState.airing.clicked &&
      mapClickState(category, setClickedFalse, clickPosterState);
  }, [tvClickPosterState.airing.clicked]);

  // Dependencies for poster click effects.
  // Will only run if the poster click index or clicked bool changes.
  const checkState = (cat, index, state) => {
    return state[cat].index || state[cat].clicked;
  };

  // Gather MOVIE details
  useEffect(() => {
    mapCreateContentDetails(arr[0].index, arr[0].category);
  }, [checkState("topRated", 0, clickPosterState)]);

  useEffect(() => {
    mapCreateContentDetails(arr[1].index, arr[1].category);
  }, [checkState("popular", 1, clickPosterState)]);

  useEffect(() => {
    mapCreateContentDetails(arr[2].index, arr[2].category);
  }, [checkState("nowPlaying", 2, clickPosterState)]);

  // Gather TV details
  useEffect(() => {
    mapTvCreateContentDetails(arr2[0].index, arr2[0].category);
  }, [checkState("topRated", 0, tvClickPosterState)]);

  useEffect(() => {
    mapTvCreateContentDetails(arr2[1].index, arr2[1].category);
  }, [checkState("popular", 1, tvClickPosterState)]);

  useEffect(() => {
    mapTvCreateContentDetails(arr2[2].index, arr2[2].category);
  }, [checkState("airing", 2, tvClickPosterState)]);

  // Gather Movie/Entertainment news.
  useEffect(() => {
    createNewsInformationDetails(setMovieNews);
  }, []);

  const topCategories = {
    movieCategories: ["topRated", "popular", "nowPlaying"],
    movieNames: ["Top Rated", "Popular", "Now Playing"],
    tvCategories: ["topRated", "popular", "airing"],
    tvNames: ["Top Rated", "Popular", "Now Airing"]
  };

  const MovieTitleContainer = () => {
    return (
      <div className={styles.topMovieContainer}>
        <div style={{ alignSelf: "flex-end" }}>
          <h1 className={styles.topMovieTitle}>Top Movies</h1>
        </div>
        <img
          src={filmReel}
          alt="film-reel-logo"
          className={styles.filmReelLogo}
        />
      </div>
    )
  }

  return (
    <>
      <NavBar
        toggleDrawer={toggleDrawer}
        loggedInUser={loggedInUser}
        handleClick={handleClick}
      />
      <SimpleMenu
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        setLoggedInUser={setLoggedInUser}
      />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h1 className={styles.mainTitle}>Trending Entertainment News</h1>
        {Object.keys(movieNews).length > 0 ? (
          <CarouselHead mediaNews={movieNews.movieNews.data} />
        ) : (
          <LoadingSpinner />
        )}
        <div style={{ height: "8vh" }} />
        <PaperSection quotes={movieQuotes} />
        <div style={{ height: "5vh" }} />

        <MovieTitleContainer />
        
        {topCategories.movieCategories.map((data, index) => (
          <>
            <CreatePosterSliderComponent
              title={topCategories.movieNames[index]}
              data={
                posterSliderInformation.length === 3 &&
                posterSliderInformation[index]
              }
              status={dispatchClickState}
              category={data}
              format={"movie"}
            />

            <MovieContent
              posterStatus={clickPosterState[data]}
              imdbInformation={contentState && contentState.imdb.data}
              details={contentState && contentState.details.data}
            />
          </>
        ))}

        {/* ++++++++++++++++++++++++++++++++++++++++++++++++++++ */}


        <div className={styles.topTvContainer}>
          <div style={{ alignSelf: "flex-end" }}>
            <h1 className={styles.topTvTitle}>Top TV</h1>
          </div>
          <img src={tvIcon} alt="tv-icon-logo" className={styles.tvIconLogo} />
        </div>

        {topCategories.tvCategories.map((data, index) => (
          <>
            <CreatePosterSliderComponent
              title={topCategories.tvNames[index]}
              data={
                tvPosterSliderInformation.length === 3 &&
                tvPosterSliderInformation[index]
              }
              status={dispatchTvClickState}
              category={data}
              format={"tv"}
            />

            <MovieContent
              posterStatus={tvClickPosterState[data]}
              imdbInformation={tvContentState && tvContentState.imdb.data}
              details={tvContentState && tvContentState.details.data}
            />
          </>
        ))}
      </div>
      <Footer />
    </>
  );
}
