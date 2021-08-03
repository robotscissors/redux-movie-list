const initialState = null;

const movieListReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'GET_MOVIE_LIST': {
            let movieList = localStorage.getItem('movieList');

            if(movieList) {
              return JSON.parse(movieList)[action.payload]
            } else {
              return null;
            }
        }
        case 'ADD_MOVIE_TO_LIST': {
          let movieList = localStorage.getItem('movieList');
          if (movieList) {
            movieList = JSON.parse(movieList);
            movieList.list.push(action.payload);
          } else {
            movieList = { list: [ action.payload ]}
          }

          localStorage.setItem('movieList', JSON.stringify(movieList));

          return movieList;
        }
        case 'REMOVE_MOVIE_FROM_LIST': {
          console.log(action.movie, action.list);
          let movieList = localStorage.getItem('movieList');
          movieList = JSON.parse(movieList);
          const updatedList = movieList[action.list].filter((movieFromList) => movieFromList.imdbID !== action.movie.imdbID);
          movieList[action.list] = updatedList;
          if(movieList.length) {
            localStorage.setItem('movieList', JSON.stringify(movieList));
          } else {
            movieList = null;
            localStorage.removeItem('movieList');
          }

          console.log('remove reducer',movieList);

          return movieList ? movieList[action.list] : null;
        }
        default:
            return state;
    }
}

export default movieListReducer;