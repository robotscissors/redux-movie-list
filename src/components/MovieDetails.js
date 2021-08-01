import React, { useEffect, useState } from 'react';
import MovieApiService from '../services/movieApi.service';

const MovieDetails = ({ imdbID }) => {
  const [ movie, setMovie ] = useState();

  useEffect(() => {
    const movieApiService = new MovieApiService();
    const getMovieById = async (imdbID) => {
      const movie = await movieApiService.getMovieById(imdbID);
      setMovie(movie);
    }
    getMovieById(imdbID);
  },[imdbID]);

  return movie ? (
    <div className="row">
      <div className="col-md-6 text-center">
        <img
          variant="top"
          src={movie.Poster !== 'N/A' ? movie.Poster : '/redux-movie-list/images/popcornPoster.jpg'}
          alt={`${movie.Title} poster`}
        />
        {(movie.Poster === 'N/A') ? <span className="text-secondary">No poster avaialble</span> : null }
      </div>
      <div className="col-md-6">
        { movie.imdbRating !== 'N/A' && <strong className="float-end text-primary h4">{movie.imdbRating}</strong> }
        <h4><strong>{movie.Title}</strong></h4>
        { movie.Rated !== 'N/A' && <span className="badge bg-secondary m-1">{movie.Rated}</span> }
        { movie.Runtime !== 'N/A' && <span className="badge bg-secondary m-1">{movie.Runtime}</span> }
        { movie.Genre !== 'N/A' && <span className="badge bg-secondary m-1">{movie.Genre}</span> }
        { movie.Plot !== 'N/A' && 
          <p><strong>Plot</strong><br/>
          {movie.Plot}</p>
        }
        { movie.Actors !== 'N/A' && 
          <p><strong>Actors</strong><br/>
          {movie.Actors}</p>
        }
      </div>
    </div>
  ) : (<h2>Loading...</h2>);
}

export default MovieDetails;