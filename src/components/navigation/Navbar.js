import RBNavbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';

const Navbar = () => {
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
              <Nav.Link as={Link} to="/movie-list">Movie List</Nav.Link>
            </Nav>
          </RBNavbar.Collapse>
        </Container>
      </RBNavbar>
    );
}

export default Navbar;