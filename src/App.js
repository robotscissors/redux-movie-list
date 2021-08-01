import { useEffect } from 'react';
import { connect } from 'react-redux';
import { getMovieList, removeMovieFromList } from './redux/actions/movieList.actions';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

let App = ({ movieList, getMovieList, removeMovieFromList  }) => {

  useEffect(() => {
    getMovieList();
  }, [getMovieList])

  return (
    <Container>
      <Row>
        { movieList
          ? movieList.list.map((movie) => (
            <Col xs={12} md={6} lg={3} key={movie.imdbID} className="mb-4">
              <Card className="h-100">
                <Card.Img
                  variant="top"
                  src={movie.Poster !== 'N/A' ? movie.Poster : '/redux-movie-list/images/popcornPoster.jpg'}
                  alt={`${movie.Title} poster`}
                />
                <Card.Body className="pb-0">
                  <Card.Title>{ movie.Title }</Card.Title>
                </Card.Body>
                <Card.Footer className="bg-white border-0 pt-0 pb-3">
                  <Button 
                    variant="danger" 
                    onClick={() => removeMovieFromList(movie)}
                  >
                    <i className="bi bi-bookmark-dash-fill"></i>&nbsp;
                    Remove From List
                  </Button>
                </Card.Footer>
              </Card>
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
