import { useState } from 'react';
import { connect } from 'react-redux';
import { addMovieToList } from '../redux/actions/movieList.actions';
import MovieApiService from '../services/movieApi.service';
import SearchBar from './SearchBar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from  'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

let MovieSearch = ({ addMovieToList }) => {
  const movieApiService = new MovieApiService();
  const [searchResults, setSearchResults] = useState(); 

  const onSearch = async (title) => {
    const results = await movieApiService.getMoviesByTitle(title);
    setSearchResults(results.Search);
  }

  const addToMovieList = async (id) => {
    const result = await movieApiService.getMovieById(id);
    addMovieToList(result);
  }

  return (
    <Container>
      <SearchBar onSearch={onSearch}/>
      <Row>
        { searchResults 
          ? searchResults.map((movie) => (
            <Col xs={12} md={6} lg={3} key={movie.imdbID} className="mb-4">
              <Card className="h-100">
                <Card.Img variant="top" src={movie.Poster} alt={`${movie.Title} poster`} />
                <Card.Body>
                  <Card.Title>{ movie.Title }</Card.Title>
                  <Button
                    variant="primary"
                    onClick={() => addToMovieList(movie.imdbID)}
                  >
                  <Button variant="primary" onClick={() => addToMovieList(movie.imdbID)}>Add To List</Button>
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
          : <Col className="text-center">
          <p className="text-secondary">Use the search bar above to begin</p>
          <img src="/redux-movie-list/images/popcornPoster.jpg" alt="" style={{maxWidth:'300px'}} />
        </Col>
        }
      </Row>
    </Container>
  )
}

MovieSearch = connect(
  null,
  { addMovieToList }
)(MovieSearch)

export default MovieSearch;