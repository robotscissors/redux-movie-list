const initialState = null;

const movieListReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'GET_MOVIE_LIST': {
            let movieLists = localStorage.getItem('movieLists'); // an array

            return JSON.parse(movieLists);
            // return listCheck(movieLists, action.payload)
            //   ? getListById(movieLists, action.payload)
            //   : null;


            // if(movieList) {
            //   return JSON.parse(movieList)
            // } else {
            //   return null;
            // }
        }
        case 'GET_ALL_MOVIE_LISTS': {
          let movieLists = localStorage.getItem('movieLists'); // an
          return movieLists ? JSON.parse(movieLists) : state
        }
        case 'ADD_MOVIE_TO_LIST': {
          let movieLists = JSON.parse(localStorage.getItem('movieLists')); // an array
          let movieList = getListById(movieLists, action.id)
          movieList.list.push(action.movie)

          const index = movieLists.findIndex(group => group.id === action.id);
          movieLists[index] = movieList;

          localStorage.setItem('movieLists', JSON.stringify(movieLists));

          return movieLists;
        }
        case 'REMOVE_MOVIE_FROM_LIST': {
          let movieLists = localStorage.getItem('movieLists');
          movieLists = JSON.parse(movieLists);

          let group = getListById(movieLists, action.id)

          const updatedList = group.list.filter((movieList) => movieList.imdbID !== action.movie.imdbID);
          const index = movieLists.findIndex(movieLists => movieLists.id === action.id);

          if (updatedList.length > 0 ){
            movieLists[index].list = updatedList;
          } else {
            movieLists.splice(index, 1); // remove list
          }

          localStorage.setItem('movieLists', JSON.stringify(movieLists));

          return movieLists ? movieLists : null;
        }
        case 'CREATE_A_NEW_LIST': {
          let movieLists = localStorage.getItem('movieLists');
          let movieList = {};
          let listId = createListId();

          movieLists = JSON.parse(movieLists);

          if (!movieLists){
            movieLists = []; // create an array
          }

          movieList = {
            id: listId,
            name: action.name,
            list: [action.movie]
          }

          movieLists.push(movieList);
          localStorage.setItem('movieLists', JSON.stringify(movieLists));

          return movieLists;
        }

        default:
            return state;
    }
}

export default movieListReducer;

const getListById = (lists, listId) => lists.filter((list) => list.id === listId)[0];
const listCheck   = (lists, listId) => !!getListById(lists, listId);

const createListId = () => {
    return Math.floor(Math.random() * 101);
  }
