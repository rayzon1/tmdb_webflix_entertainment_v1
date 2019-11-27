import React, { useEffect, useState } from "react";
import PosterSlider from "./components/PosterSlider";
import TemporaryDrawer from "./components/MenuDrawer";
import LoadingSpinner from "./components/LoadingSpinner";
import Home from "./containers/Home";
import SignIn from "./containers/SignIn";
import NavBar from "./components/NavBar";
import MovieSearch from "./containers/MovieSearch";
import NewSignUp from "./components/NewSignUp";
import "./App.css";
import {
  movieUrls,
  createPosterSliderInformation
} from "./exports/apiFetchFunctions";
import { HashRouter, Route, Switch } from "react-router-dom";

function App() {
  const [posterSliderInformation, setPosterSliderInformation] = useState([]);
  const [tvPosterSliderInformation, setTvPosterSliderInformation] = useState(
    []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [localUsers, setLocalUsers] = useState([]);

  // Top state will set logged in username to display on NavBar within the home and movie/tv search pages.
  const [loggedInUser, setLoggedInUser] = useState("");

  //Local Storage for user signups.
  const localUser = window.localStorage;

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false
  });

  const toggleDrawer = (side, open) => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  // Gathers movie data from TMDb API for poster-sliders.
  useEffect(() => {
    createPosterSliderInformation(
      movieUrls("top_rated", "movie"),
      setPosterSliderInformation,
      "movie",
      setIsLoading
    );
    createPosterSliderInformation(
      movieUrls("popular", "movie"),
      setPosterSliderInformation,
      "movie",
      setIsLoading
    );
    createPosterSliderInformation(
      movieUrls("now_playing", "movie"),
      setPosterSliderInformation,
      "movie",
      setIsLoading
    );
  }, []);

  // Gathers TV data from TMDb API for poster-sliders.
  useEffect(() => {
    createPosterSliderInformation(
      movieUrls("top_rated", "tv"),
      setTvPosterSliderInformation,
      "tv",
      setIsLoading
    );
    createPosterSliderInformation(
      movieUrls("popular", "tv"),
      setTvPosterSliderInformation,
      "tv",
      setIsLoading
    );
    createPosterSliderInformation(
      movieUrls("on_the_air", "tv"),
      setTvPosterSliderInformation,
      "tv",
      setIsLoading
    );
  }, []);

  const effectDepend = tvPosterSliderInformation.length === 3;
  useEffect(() => {
    tvPosterSliderInformation.length !== 0 &&
      console.log(tvPosterSliderInformation);
  }, [effectDepend]);

  useEffect(() => {
    localUsers.length > 0 &&
      localUsers.forEach((data, index) => {
        localUser.setItem(
          `user${Object.keys(localUser).length}`,
          JSON.stringify(data)
        );
      });

    // const users = JSON.parse(localUser.user);
    console.log(localUser);
    console.log(localUsers);
  }, [localUsers, localUser]);

  return (
    <HashRouter>
      <Switch>
        <div className="App">
          <TemporaryDrawer
            state={state}
            setState={setState}
            toggleDrawer={toggleDrawer}
          />
          <Route
            exact
            path="/"
            render={() => (
              <SignIn
                localUser={localUser}
                toggleDrawer={toggleDrawer}
                setLoggedInUser={setLoggedInUser}
              />
            )}
          />
          <Route
            exact
            path="/home"
            render={() =>
              isLoading ? (
                <LoadingSpinner />
              ) : (
                <Home
                  posterSliderInformation={posterSliderInformation}
                  tvPosterSliderInformation={tvPosterSliderInformation}
                  toggleDrawer={toggleDrawer}
                  loggedInUser={loggedInUser}
                  setLoggedInUser={setLoggedInUser}
                />
              )
            }
          />
          <Route
            exact
            path="/moviesearch"
            render={() => (
              <MovieSearch
                category={"movie"}
                toggleDrawer={toggleDrawer}
                loggedInUser={loggedInUser}
                setLoggedInUser={setLoggedInUser}
              />
            )}
          />
          <Route
            exact
            path="/tvshowsearch"
            render={() => (
              <MovieSearch
                category={"tv"}
                toggleDrawer={toggleDrawer}
                loggedInUser={loggedInUser}
                setLoggedInUser={setLoggedInUser}
              />
            )}
          />
          <Route
            exact
            path="/signup"
            render={() => (
              <NewSignUp
                setLocalUsers={setLocalUsers}
                localUsers={localUsers}
                localUser={localUser}
                toggleDrawer={toggleDrawer}
              />
            )}
          />
        </div>
      </Switch>
    </HashRouter>
  );
}

export default App;
