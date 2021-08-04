import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getMovieList, addMovieToList, createANewList } from '../redux/actions/movieList.actions';
import MovieApiService from '../services/movieApi.service';
import Modal from './Modal';
import CreateNewList from './Lists/CreateNewList';
import Pagination from './navigation/Pagination';
import SearchBar from './navigation/SearchBar';
import MovieCard from './Movies/MovieCard';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from  'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

let MovieSearch = ({ movieList, getMovieList, addMovieToList, createANewList }) => {
  const movieApiService = new MovieApiService();
  const [ searchResults, setSearchResults ] = useState();
  const [ title, setTitle ] = useState();
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ selectedMovie, setSelectedMovie ] = useState(null);
  const [ addToList, setAddToList] = useState(null);

  useEffect(() => {
    getMovieList();
  }, [getMovieList]);

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

  const createOrSelectMovieList = (id) => {
    setAddToList(id);
  }

  const onClose = () => setSelectedMovie(null);
  const onListClose = () => setAddToList(null);

  return (
    <Container>
      <SearchBar onSearch={onSearch} setTitle={setTitle} />
        { searchResults
          ? <>
            <Row>
              { searchResults.Search.map((movie,index,movieList) => (
                <Col xs={12} md={6} lg={3} key={movie.imdbID} className="mb-4">
                  <MovieCard
                    movie={movie}
                    movieList={movieList}
                    onClose={onClose}
                    selectedMovie={selectedMovie}
                    setSelectedMovie={setSelectedMovie}
                    key={index}
                    buttons={movieList.list?.indexOf(movie.imdbID)
                      ?
                        <Button variant="primary">
                          <i className="bi bi-bookmark-plus"></i>&nbsp;
                          In Movie List
                        </Button>
                      :                        <Button variant="success" onClick={() => createOrSelectMovieList(movie.imdbID)}>
                          <i className="bi bi-bookmark-plus"></i>&nbsp;
                          Add to list
                        </Button>
                    }
                  />
                    { addToList === movie.imdbID &&
                        <Modal
                        movie={movie}
                        onClose={onListClose}
                        children={ <CreateNewList movie={movie} onListClose={onListClose} /> }
                      />
                    }
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

const mapStateToProps = state => ({
  movieList: state.movieListReducer,
});

MovieSearch = connect(
  mapStateToProps,
  { getMovieList, addMovieToList, createANewList }
)(MovieSearch)

export default MovieSearch;