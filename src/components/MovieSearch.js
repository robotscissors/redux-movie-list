import { useState } from 'react';
import { connect } from 'react-redux';
import { addMovieToList } from '../redux/actions/movieList.actions';
import MovieApiService from '../services/movieApi.service';
import Pagination from './Pagination';
import SearchBar from './SearchBar';
import MovieCard from './MovieCard';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from  'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

let MovieSearch = ({ addMovieToList }) => {
  const movieApiService = new MovieApiService();
  const [ searchResults, setSearchResults ] = useState(); 
  const [ title, setTitle ] = useState();
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ selectedMovie, setSelectedMovie ] = useState(null);

  const runSearch = async () => {
    const results = await movieApiService.getMoviesByTitle(title,currentPage);
    setSearchResults(results);
  }

  const onSearch = async () => {
    if(title) {
      setCurrentPage(1);
      return await runSearch();
    }
    return [];
  }

  const goToPage = async (page) => {
    setCurrentPage(page);
    runSearch();
  }

  const addToMovieList = async (id) => {
    const result = await movieApiService.getMovieById(id);
    addMovieToList(result);
  }

  const onClose = () => setSelectedMovie(null);

  return (
    <Container>
      <SearchBar onSearch={onSearch} setTitle={setTitle} />
        { searchResults
          ? <>
            <Row>
              { searchResults.Search.map((movie,index) => (
                <Col xs={12} md={6} lg={3} key={movie.imdbID} className="mb-4">
                  <MovieCard 
                    movie={movie}
                    onClose={onClose}
                    selectedMovie={selectedMovie}
                    setSelectedMovie={setSelectedMovie}
                    key={index}
                    buttons={
                      <Button variant="success" onClick={() => addToMovieList(movie.imdbID)}>
                        <i className="bi bi-bookmark-plus"></i>&nbsp;
                        Add To List
                      </Button>
                    }
                  />
                </Col>
              ))}
            </Row>
            <Row>
              <Col>
                <Pagination searchResults={searchResults} currentPage={currentPage} setCurrentPage={goToPage} />
              </Col>
            </Row>
          </>
          : <Row>
              <Col className="text-center">
              <p className="text-secondary">Use the search bar above to begin</p>
              <img src="/redux-movie-list/images/popcornPoster.jpg" alt="" style={{maxWidth:'300px'}} />
            </Col>
          </Row>
        }
    </Container>
  )
}

MovieSearch = connect(
  null,
  { addMovieToList }
)(MovieSearch)

export default MovieSearch;