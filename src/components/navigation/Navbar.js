import { connect } from 'react-redux';
import { useState, useEffect } from 'react';
import RBNavbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import { getAllMovieLists } from '../../redux/actions/movieList.actions';


let Navbar = ({getAllMovieLists}) => {
  const [movieLists, setMovieLists]  = useState(null);

  const options = (movieLists) => {
    if (Array.isArray(movieLists)){
      return (
        <>
        { movieLists &&
          movieLists.map((movieGroup) => (
            <NavDropdown.Item eventKey={movieGroup.id}>{movieGroup.name}</NavDropdown.Item>
          ))
        }
        </>
    ) } else {

      return <></>
    }

  }

  useEffect(() => {
    const lists = getAllMovieLists();
    setMovieLists(lists);
  }, []);

    return (
      <RBNavbar bg="light" fixed="top" expand="sm">
        <Container>
          <RBNavbar.Brand as={Link} to="/">
            <img
              src="/redux-movie-list/logo192.png"
              width="30"
              height="30"
              alt=""
              className="d-inline-block align-top mr-2"
            />
            Movie Database
          </RBNavbar.Brand>
          <RBNavbar.Toggle />
          <RBNavbar.Collapse>
            <Nav>
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              { Array.isArray(movieLists)
                ?
                  <NavDropdown title="Movie List" id="nav-dropdown">
                  { options(movieLists) }
                  </NavDropdown>
                :
                <Nav.Link as={Link} to="/movie-list">Movie List</Nav.Link>
              }

            </Nav>
          </RBNavbar.Collapse>
        </Container>
      </RBNavbar>
    );

  }
  const mapStateToProps = state => ({
    movieList: state.movieListReducer,
  });

  Navbar = connect(
    mapStateToProps,
    { getAllMovieLists }
  )(Navbar)
export default Navbar;