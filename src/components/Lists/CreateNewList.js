import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createANewList, getAllMovieLists, addMovieToList } from '../../redux/actions/movieList.actions';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

let CreateNewList = ({ movie, onListClose, createANewList, getAllMovieLists, addMovieToList }) => {
  const [listName, setListName] = useState();
  const [movieListNames, setMovieListNames] = useState([]);

  const selectThisList = (id, movie) => {
    addMovieToList(id, movie);
    onListClose();
  }

  useEffect(() => {
    const result = JSON.parse(localStorage.getItem('movieLists'));
    if (result){
      setMovieListNames(result);
    } else {
      setMovieListNames([]);
    }

  },[]);

  const onFormSubmit = (e) => {
    createANewList(listName, movie);
    e.preventDefault();
    onListClose();
  }

  let prompt;
  if (movieListNames.length > 0) {
    prompt = <h4>Click on a list name to add it to that name, or create a new list</h4>;
  } else {
    prompt = <h4>No lists are available, create a new list</h4>;
  }
  return movieListNames
    ? (
      <Container>
        <Row>
          {prompt}
        </Row>
        <Row>
        <Col style={{marginBottom:"1em"}}>
          { movieListNames.map((list, index) => (

                <Button
                  variant="warning"
                  key={index}
                  onClick={() => selectThisList(list.id, movie)}
                  style={{marginRight: "1em"}}
                >
                  <i class="bi bi-card-list"></i> {list.name}
                </Button>
              ))
          }
        </Col>
        </Row>
        <Form inline onSubmit={onFormSubmit}>
          <Row>
            <Col sm={9}>
              <InputGroup className="form-group mb-3">
                  <Form.Control
                      type="text"
                      id="listName"
                      name="listName"
                      placeholder="Enter a list name"
                      onChange={(e) => setListName(e.target.value)}
                      required
                  />
              </InputGroup>
            </Col>
            <Col sm={3}>
              <Button type="submit" className="w-100 mb-3">Create New List</Button>
            </Col>
          </Row>
        </Form>
      </Container>
  ) : null
}

const mapStateToProps = state => ({
  getAllMovieLists: state.movieListReducer,
});

CreateNewList = connect(
  mapStateToProps,
  { createANewList, getAllMovieLists, addMovieToList }
)(CreateNewList);

export default CreateNewList;

