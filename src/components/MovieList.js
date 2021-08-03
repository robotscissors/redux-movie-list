import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getMovieList, removeMovieFromList } from '../redux/actions/movieList.actions';
import MovieCard from './Movies/MovieCard';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

let App = ({ movieList, getMovieList, removeMovieFromList  }) => {
  const [ selectedMovie, setSelectedMovie ] = useState(null);

  useEffect(() => {
    getMovieList();
  }, [getMovieList]);

  const onClose = () => setSelectedMovie(null);
  console.log('moveList.js',movieList);

  return (
    <Container>
      { console.log('movie list container',movieList)}
      <Row>
        { movieList
          ? movieList.map((movie,index) => (
            <Col xs={12} md={6} lg={3} key={movie.imdbID} className="mb-4">
              <MovieCard 
                movie={movie}
                movieList={movieList}
                onClose={onClose}
                selectedMovie={selectedMovie}
                setSelectedMovie={setSelectedMovie}
                key={index}
                buttons={
                  <Button 
                    variant="danger" 
                    onClick={() => removeMovieFromList(movie)}
                  >
                    <i className="bi bi-bookmark-dash-fill"></i>&nbsp;
                    Remove From List
                  </Button>
                }
              />
            </Col>
          ))
          : <Row>
              <Col className="text-center">
                <p className="text-secondary">
                  You haven't added any movies yet. <br />
                  First <a href="/redux-movie-list/">searh for a movie</a>, then click "Add To List".
                </p>
                <img src="/redux-movie-list/images/popcornPoster.jpg" alt="" style={{maxWidth:'300px'}} />
              </Col>
            </Row>
        }
      </Row>
    </Container>
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
