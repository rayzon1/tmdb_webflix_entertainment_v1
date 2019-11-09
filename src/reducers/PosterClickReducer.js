import * as PosterClickActionTypes from "../actionTypes/PosterClickActionTypes";

const initialState = {
  clickState: {
    topRated: {
      index: null,
      clicked: false
    },
    popular: {
      index: null,
      clicked: false
    },
    upcoming: {
      index: null,
      clicked: false
    },
    nowPlaying: {
      index: null,
      clicked: false
    }
  },

  tvClickState: {
    topRated: {
      index: null,
      clicked: false
    },
    popular: {
      index: null,
      clicked: false
    },
    airing: {
      index: null,
      clicked: false
    }
  }

};

const returnClick = (action, indexState, clickedState) => {
  return {
    index: action,
    clicked: action === indexState ? !clickedState : true
  };
};

export default function PosterClickReducer(state = initialState, action) {

  switch (action.type) {

    case PosterClickActionTypes.CHANGE_CLICK_STATE:
      return {
        ...state,
        clickState: {
          topRated:
            action.item === "topRated"
              ? returnClick(
                  action.index,
                  state.clickState.topRated.index,
                  state.clickState.topRated.clicked,
                  state.clickState.topRated
                )
              : { ...state.clickState.topRated },
          popular:
            action.item === "popular"
              ? returnClick(
                  action.index,
                  state.clickState.popular.index,
                  state.clickState.popular.clicked,
                  state.clickState.popular
                )
              : { ...state.clickState.popular },
          upcoming:
            action.item === "upcoming"
              ? returnClick(
                  action.index,
                  state.clickState.upcoming.index,
                  state.clickState.upcoming.clicked,
                  state.clickState.upcoming
                )
              : { ...state.clickState.upcoming },
          nowPlaying:
            action.item === "nowPlaying"
              ? returnClick(
                  action.index,
                  state.clickState.nowPlaying.index,
                  state.clickState.nowPlaying.clicked,
                  state.clickState.nowPlaying
                )
              : { ...state.clickState.nowPlaying },
        },
        
      };


      case PosterClickActionTypes.CHANGE_TV_CLICK_STATE:
        return {
          ...state,
          tvClickState: {
            topRated:
              action.item === "topRated"
                ? returnClick(
                    action.index,
                    state.tvClickState.topRated.index,
                    state.tvClickState.topRated.clicked,
                    state.tvClickState.topRated
                  )
                : { ...state.tvClickState.topRated },
            popular:
              action.item === "popular"
                ? returnClick(
                    action.index,
                    state.tvClickState.popular.index,
                    state.tvClickState.popular.clicked,
                    state.tvClickState.popular
                  )
                : { ...state.tvClickState.popular },
            airing:
              action.item === "airing"
                ? returnClick(
                    action.index,
                    state.tvClickState.airing.index,
                    state.tvClickState.airing.clicked,
                    state.tvClickState.airing
                  )
                : { ...state.tvClickState.airing },
          
          },
        };

    //CHANGE_FALSE_CLICK_STATE
    case PosterClickActionTypes.CHANGE_FALSE_CLICK_STATE:
      return {
        ...state,
        clickState: {
          topRated: {
            ...state.clickState.topRated,
            clicked: action.item === "topRated" ? false : state.clickState.topRated.clicked
          },
          popular: {
            ...state.clickState.popular,
            clicked: action.item === "popular" ? false : state.clickState.popular.clicked
          },
          upcoming: {
            ...state.clickState.upcoming,
            clicked: action.item === "upcoming" ? false : state.clickState.upcoming.clicked
          },
          nowPlaying: {
            ...state.clickState.nowPlaying,
            clicked: action.item === "nowPlaying" ? false : state.clickState.nowPlaying.clicked
          }
        }
      };

      case PosterClickActionTypes.CHANGE_FALSE_TV_CLICK_STATE:
      return {
        ...state,
        tvClickState: {
          topRated: {
            ...state.tvClickState.topRated,
            clicked: action.item === "topRated" ? false : state.tvClickState.topRated.clicked
          },
          popular: {
            ...state.tvClickState.popular,
            clicked: action.item === "popular" ? false : state.tvClickState.popular.clicked
          },
          airing: {
            ...state.tvClickState.airing,
            clicked: action.item === "airing" ? false : state.tvClickState.airing.clicked
          },
         
        },
      };

      

    default:
      return state;
  }
}
