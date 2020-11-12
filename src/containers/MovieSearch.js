import React, { useState, useEffect, useCallback } from "react";
import SearchBar from "../components/SearchBar";
import Footer from "../components/Footer";
import Axios from "axios";
import { authToken } from "../config";
import SearchPlaceHolder from "../components/SearchPlaceHolder";
import LoadingSpinner from "../components/LoadingSpinner";
import styles from "../modules/container-modules/moviesearch-container.module.css";
import PaginationBar from "../components/PaginationBar";
import MaterialButton from "../components/MaterialButton";
import SimpleModal from "../components/Modal";
import clapperboard from "../images/clapperboard.png";
import tvIcon from "../images/tvIcon.png";
import NavBar from "../components/NavBar";
import SimpleMenu from "../components/AccountMenu";

export const searchUrl = (category, query, page) => {
  return `https://api.themoviedb.org/3/search/${category}?api_key=${authToken}&language=en-US&query=${query}&page=${page}&include_adult=false"`;
};

export const video = key => {
  return (
    <iframe
      width="100%"
      height="100%"
      src={`https://www.youtube.com/embed/${key}?controls=1&autoplay=1&loop=1`}
      frameborder="0"
      allow="accelerometer; autoplay=1; encrypted-media; gyroscope; picture-in-picture"
      title="youtube-trailers"
      allowfullscreen
    ></iframe>
  );
};

// Need to use movieIds to find video key to add to youtube url above.
export const getVideoKeys = (cat, id) => {
  return `https://api.themoviedb.org/3/${cat}/${id}/videos?api_key=${authToken}&language=en-US`;
};


//! https://image.tmdb.org/t/p/w300/ for poster paths
export default function MovieSearch({
  category,
  toggleDrawer,
  loggedInUser,
  setLoggedInUser
}) {
  // Main search string hook.
  //TODO: Make search bar spin icon show when onChange occurs.
  const [movieSearch, setMovieSearch] = useState("");

  const [clicked, setClicked] = useState(false);

  const [clear, setClear] = useState(false);

  const [movieData, setMovieData] = useState([]);

  const [isLoading, setLoading] = useState(false);

  const [active, setActive] = useState(1);

  const [anchorEl, setAnchorEl] = React.useState(null);

  //! Index of image clicked
  const [imageClickIndex, setImageClickIndex] = useState(0);

  const [movieIds, setMovieIds] = useState([]);
  const [trailerUrls, setTrailerUrls] = useState([]);
  const [trailerData, setTrailerData] = useState([]);

  const [noResults, setNoResults] = useState(false);

  const [trailerKeys, setTrailerKeys] = useState(null);

  //! Modal Handlers
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const searchApiCall = query => {
    Axios.get(
      category === "movie"
        ? searchUrl("movie", query, active)
        : searchUrl("tv", query, active)
    )
      .then(data => {
        if (data.data.results.length < 1) {
          setNoResults(true);
        } else {
          setNoResults(false);
          setMovieData([data.data]);
        }
      })
      .catch(err => console.log(err.message));
  };

  const searchApi = useCallback(
    (query) => {
      searchApiCall(query);
    },
    [],
  )

  const getMovieIds = items => {
    let arr = items.results.map(data => {
      return data.id;
    });
    setMovieIds(arr);
  };

  const getTrailerKeys = items => {
    let arr = items.map(id => {
      if (category === "movie") {
        return getVideoKeys("movie", id);
      } else {
        return getVideoKeys("tv", id);
      }
    });
    setTrailerUrls(arr);
  };

  const getTrailerData = items => {
    const arr = items.map(data => {
      return Axios.get(data);
    });

    Axios.all(arr).then(data => {
      return setTrailerData(data.map(data => data.data.results));
    });
  };

  const getYoutubeKeys = arr => {
    const items = arr.map(data => data.length > 0 && data.map(data => data));
    const trailerIndex = items.map(data => {
      const randVideo = data && Math.floor(Math.random() * data.length);
      return randVideo;
    });
    const youtubeVideos = items.map((data, index) => {
      if (data && index === imageClickIndex) {
        return data[trailerIndex[imageClickIndex]];
      }
    });
    return setTrailerKeys(
      youtubeVideos[imageClickIndex] === undefined
        ? console.log('fail')
        : youtubeVideos[imageClickIndex].key
    );
  };

  movieData.length > 0 && movieIds.length < 1 && getMovieIds(movieData["0"]);

  movieIds.length > 0 && trailerUrls.length < 1 && getTrailerKeys(movieIds);

  trailerUrls.length > 0 &&
    trailerData.length < 1 &&
    getTrailerData(trailerUrls);

  trailerData.length > 0 && trailerKeys === null && getYoutubeKeys(trailerData);


  // TODO: This is the side-effect triggered when search button is clicked. 
  // TODO: Change this to activate when search is started.
  useEffect(() => {

    if (clicked) {
      setNoResults(false);
      setLoading(true);
      setTimeout(() => {
        searchApiCall(movieSearch);
        // searchApi(movieSearch);
        setLoading(false);
        setClicked(false);
      }, 1000);
    }

    return () => console.log("movie search effect unmounted.")

  }, [clicked, setClicked, movieSearch, searchApiCall]);

  // Clears all data when clear button is pressed.
  useEffect(() => {
    if (clear) {
      setMovieData([]);
      setMovieIds([]);
      setMovieSearch("");
      setTrailerData([]);
      setTrailerUrls([]);
      setNoResults(false);
      setTrailerKeys(null);
      setActive(1);
      setClear(false);
    }
  }, [clear, setClear]);

  useEffect(() => {
    trailerData.length > 0 && getYoutubeKeys(trailerData);
    return () => {
      console.log("youtube keys cleared");
      setTrailerKeys(null);
    };
  }, [imageClickIndex]);

  useEffect(() => {
    active !== 1 && setLoading(true);
    setTimeout(() => {
      setMovieData([]);
      setMovieIds([]);
      setTrailerUrls([]);
      setTrailerData([]);
      setTrailerKeys(null);
      searchApiCall(movieSearch);

      movieData && setLoading(false);
    }, 1000);
  }, [active]);

  return (
    <>
      <NavBar
        section={"moviesearch"}
        toggleDrawer={toggleDrawer}
        loggedInUser={loggedInUser}
        setLoggedInUser={setLoggedInUser}
        handleClick={handleClick}
      />
      <SimpleMenu anchorEl={anchorEl} setAnchorEl={setAnchorEl} setLoggedInUser={setLoggedInUser} />
      <div>
        <h1 className={styles.title}>
          {category === "movie" ? "Movie Search" : "TV Search"}
        </h1>
        <div className={styles.searchContainer}>
          <SearchBar search={setMovieSearch} clear={clear} />
          <div className={styles.buttonContainer}>
            <MaterialButton
              text={"Search"}
              search={movieSearch}
              clicked={setClicked}
            />
            <MaterialButton
              text={"Clear"}
              search={movieSearch}
              clicked={setClear}
            />
          </div>
        </div>
        <div className={styles.mainSearchContainer}>
          <div className={styles.searchResultsContainer}>
            {clicked === false &&
              movieData.length === 0 &&
              noResults === false &&
              (category === "movie" ? (
                <SearchPlaceHolder
                  icon={clapperboard}
                  altText={"clapperboard-icon"}
                  desc={"Search for your favorite movies!"}
                />
              ) : (
                <SearchPlaceHolder
                  icon={tvIcon}
                  altText={"tv-icon"}
                  desc={"Search for your favorite TV shows!"}
                />
              ))}
            {noResults && <p>NO RESULTS!</p>}

            {isLoading ? (
              <div>
                <LoadingSpinner type={"Puff"} />
              </div>
            ) : (
              movieData.length > 0 &&
              movieData["0"].results.map(
                (data, index) =>
                  data.poster_path != null &&
                  data.backdrop_path != null && (
                    <img
                      src={`https://image.tmdb.org/t/p/w200/${data.poster_path}`}
                      alt="search-images"
                      className={styles.images}
                      onClick={e => {
                        e.target.style.boxShadow = "none";
                        setImageClickIndex(index);
                        handleOpen();
                      }}
                      onMouseLeave={e =>
                        (e.target.style.boxShadow = "rgb(0, 0, 0) 2px 2px 4px")
                      }
                    />
                  )
              )
            )}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            margin: "4vh 0"
          }}
        >
          {movieData.length > 0 && (
            <PaginationBar
              data={movieData["0"]}
              setActive={setActive}
              active={active}
              setLoading={setLoading}
            />
          )}
          <SimpleModal
            open={open}
            setOpen={setOpen}
            videoKey={trailerKeys}
            content={video(trailerKeys)}
          />
        </div>
        <Footer />
      </div>
    </>
  );
}
