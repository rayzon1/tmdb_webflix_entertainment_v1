import React, { useEffect, useState } from "react";
import PosterSlider from './components/PosterSlider';
import TemporaryDrawer from './components/MenuDrawer';
import Home from './containers/Home';
import SignIn from './containers/SignIn';
import NavBar from './components/NavBar';
import MovieSearch from './containers/MovieSearch';
import "./App.css";
import { movieUrls, createPosterSliderInformation } from './exports/apiFetchFunctions';
import { HashRouter, Route, Switch } from "react-router-dom";



function App() {

  const [posterSliderInformation, setPosterSliderInformation] = useState([]);
  
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

  

  useEffect(() => {
    
    createPosterSliderInformation(movieUrls('top_rated', 'movie'), setPosterSliderInformation);
    createPosterSliderInformation(movieUrls('popular', 'movie'), setPosterSliderInformation);
    createPosterSliderInformation(movieUrls('now_playing', 'movie'), setPosterSliderInformation);
  
  }, [])

  useEffect(() => {
    posterSliderInformation.length !== 0 &&
    console.log(posterSliderInformation);
  }, [posterSliderInformation.length === 3])

  
  return (
    <HashRouter>
        <Switch>
          <div className="App">
            <NavBar toggleDrawer={toggleDrawer} />
            <TemporaryDrawer
              state={state}
              setState={setState}
              toggleDrawer={toggleDrawer}
            />
            <Route exact path="/" render={() => <SignIn />} />
            <Route
              exact
              path="/home"
              render={() => <Home posterSliderInformation={posterSliderInformation}/>}
            />
            <Route exact path="/moviesearch" render={() => <MovieSearch category={'movie'} />} />
            <Route exact path="/tvshowsearch" render={() => <MovieSearch category={'tv'} />} />
          </div>
        </Switch>
      </HashRouter>
  );
}

export default App;
