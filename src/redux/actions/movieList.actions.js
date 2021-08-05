export const getMovieList = (id) => ( { type: 'GET_MOVIE_LIST', id } );
export const getAllMovieLists = () =>  ( { type: 'GET_ALL_MOVIE_LISTS'} );
export const addMovieToList = (id, movie) => ( { type: 'ADD_MOVIE_TO_LIST', id, movie } );
export const removeMovieFromList = (id, movie) => ( { type: 'REMOVE_MOVIE_FROM_LIST', id, movie } );
export const createANewList = (name, movie) => ( { type: 'CREATE_A_NEW_LIST', name, movie } );