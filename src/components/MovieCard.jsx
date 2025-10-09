import React from 'react'

const MovieCard = ({ 
  movie: { 
    id, 
    title, 
    vote_average, 
    poster_path, 
    release_date, 
    original_language 
  } 
}) => {
  return (
    <div className='movie-card'>
      <img src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}`: '/No-Poster.svg'} alt={title} />

      <div className="mt-4">
        <h3 className="text-white">{title}</h3>
      </div>

      <div className="content">
        <div className="rating">
          <i className="fas fa-star text-yellow-500"></i>
          <p>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
        </div>

        <span>|</span>

        <p className="lang">{original_language}</p>
        <span>|</span>
        <p className="year">{release_date? release_date.split('-')[0] : 'N/A'}</p>
      </div>
    </div>
  )
}

export default MovieCard