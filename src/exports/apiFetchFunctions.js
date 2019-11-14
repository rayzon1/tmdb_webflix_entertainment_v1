import axios from 'axios';
import { authToken, apiKey, newsApiKey } from '../config';

// Main endpoint for movie information.
//TODO: Create function to gather movie ids from data object then get movieDetails from API.
export const movieUrls = (data, category) => {
  return `https://api.themoviedb.org/3/${category}/${data}?api_key=${authToken}&language=en-US`;
}

export const movieReviewsUrl = (data, category) => {
  return `https://api.themoviedb.org/3/${category}/${data}/reviews?api_key=${authToken}&language=en-US&page=1`
}

export const imdbUrls = data => {
  return `https://www.omdbapi.com/?apikey=${apiKey}&i=${data}`
}

const todayDate = new Date().toISOString().slice(0, 10);

export const movieNewsUrl = category => {
  return `https://newsapi.org/v2/everything?q=${category}&from=${todayDate}&to=${todayDate}&sortBy=relevancy&apiKey=${newsApiKey}`;
};


// Takes in main endpoint for category ex. top_rated, popular.
export const createPosterSliderInformation = (endpoint, func, category, func2) => {
    let posterSlider = {};
    func2(true);
    const mainData = axios.get(endpoint);
    mainData.then( async data => {
      
      try {
        if (data.status === 429) {
          var d = new Date();
          throw new Error(`Too many requests ${d}`);
        } else {
          
          const endData =  await data.data;
          const ids =  await data.data.results.map(data => data.id);
          const detailUrls =  await ids.map(data => movieUrls(data, category));

          posterSlider.data =  await endData;
          posterSlider.ids =  await ids;
          posterSlider.details = await detailUrls;

          func(prev => [...prev, posterSlider]);
        }
      } catch (error) {
        console.error("Error", error);
      }
      
    }).then(() => func2(false))

    
  };

// take in index of poster clicked 
// compare clicked index to index of url in posterSliderInformation object
// run url through axios to obtain details/ reviews.
export const createContentDetails = (arr, func, clickIndex) => {
  const contentContainer = {};
  arr.forEach(async(data, index) => {
    if(index === clickIndex) {
      try { 
        const details = await axios.get(data);
        const imdb = await axios.get(imdbUrls(details.data.imdb_id));
        
        contentContainer.details = details;
        contentContainer.imdb = imdb;
        
        func(contentContainer);
      } catch (error) {
        console.error('Error:', error);
      }
    }
  });
}

// Entertainment news fetch function.
// Ping endpoint, store data in local state - Home container.
// Provide data to Carousel component.
export const createNewsInformationDetails = func => {
  const contentContainer = {};
  const mainData = axios.get(movieNewsUrl("movies"));

  mainData
    .then(async data => {
      try {
        contentContainer.movieNews = data;
        
      } catch (error) {
        console.error('Error with News Information get function', error);
      }
    })
    .then(() => func(contentContainer))

}
  