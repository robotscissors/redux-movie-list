import MovieDetails from './MovieDetails';
import Modal from '../Modal';
import Card from 'react-bootstrap/Card';

const ShowCard = ({ movie, buttons, onClose, selectedMovie, setSelectedMovie }) => {

  return (
    <div>
      <Card className="h-100">
        <Card.Img
          variant="top"
          src={movie.Poster !== 'N/A' ? movie.Poster : '/redux-movie-list/images/popcornPoster.jpg'}
          alt={`${movie.Title} poster`}
          onClick={() => setSelectedMovie(movie.imdbID)} style={{cursor:'pointer'}}
        />
        <Card.Body className="pb-0">
          <Card.Title>{ movie.Title }</Card.Title>
        </Card.Body>
        <Card.Footer className="bg-white border-0 pt-0 pb-3">
          { buttons }
        </Card.Footer>
      </Card>
      { selectedMovie === movie.imdbID &&
        <Modal
          title={movie.Title}
          onClose={onClose}
          buttons={buttons}
          children={ <MovieDetails imdbID={selectedMovie} /> } 
        />
      }
    </div>
  )
}

export default ShowCard;