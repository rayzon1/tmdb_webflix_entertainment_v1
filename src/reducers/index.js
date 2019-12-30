import PosterClickReducer from "./PosterClickReducer";
import { createStore, combineReducers, compose } from "redux";
// import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

// put store here and combine reducers then export

const rootReducer = combineReducers({
  
  posterClickState: PosterClickReducer,
  
});

const searchStore = () => {
  return createStore(
    rootReducer,
    compose(
      // applyMiddleware(thunk),
      composeWithDevTools()
    )
  );
};

const store = searchStore();
export default store;
