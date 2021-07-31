import { useEffect } from 'react';
import { connect } from 'react-redux';

import { getMovieList, removeMovieFromList } from './redux/actions/movieList.actions';

let App = ({ movieList, getMovieList, removeMovieFromList  }) => {

  useEffect(() => {
    getMovieList();
  }, [getMovieList])

  return (
    <div>
      <h1>My Movie List</h1>
      {
        movieList && movieList.list && movieList.list.map((movie) => (
          <div key={movie.imdbID}>
            <img src={movie.Poster} alt={`${movie.Title} poster`} />
            <h3>{ movie.Title }</h3>
            <button onClick={() => removeMovieFromList(movie)}>Remove From List</button>
          </div>
        ))
      }
    </div>
  );
}

const mapStateToProps = state => ({
  movieList: state.movieListReducer,
});

App = connect(
  mapStateToProps,
  { getMovieList, removeMovieFromList }
)(App)

export default App;
