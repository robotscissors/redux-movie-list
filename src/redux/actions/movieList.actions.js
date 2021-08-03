export const getMovieList = (payload = 'list') => ( { type: 'GET_MOVIE_LIST', payload: payload } );
export const addMovieToList = (payload) => ( { type: 'ADD_MOVIE_TO_LIST', payload: payload } );
export const removeMovieFromList = (movie, list = 'list') => ( { type: 'REMOVE_MOVIE_FROM_LIST', movie, list } );