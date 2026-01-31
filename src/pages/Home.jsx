import { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar.jsx';
import MovieCard from '../components/MovieCard.jsx';
import { useDebounce } from 'react-use';
import Pagination from '../components/Pagination.jsx';

const Home = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [movies, setMovies] = useState(['']);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  useDebounce(() => setDebouncedQuery(query), 500, [query]);

  const loadTrendingMovies = async () => {
    try {
      const res = await fetch('/.netlify/functions/trending', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      });

      if (!res.ok)
        throw new Error(
          'Please check your internet connection and try again later!',
        );

      const data = await res.json();

      setTrendingMovies(data);
    } catch (e) {
      // setErrorMsg(e.message)
    }
  };

  useEffect(() => {
    loadTrendingMovies();
  }, []);

  useEffect(() => {
    (async (query = '', page = undefined) => {
      setLoading(true);
      setErrorMsg('');

      try {
        let endpoint = `/.netlify/functions/${query ? `searchMovie?query=${encodeURIComponent(query)}` : 'movies'}`;

        if (query && page) {
          endpoint += `&page=${page}`;
        } else if (page) {
          endpoint += `?page=${page}`;
        }

        const res = await fetch(endpoint, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
          },
        });

        if (!res.ok)
          throw new Error(
            'Please check your internet connection and try again later!',
          );

        const data = await res.json();

        setMovies(data.results || []);
      } catch (e) {
        setErrorMsg(e.message);
      } finally {
        setLoading(false);
      }
    })(debouncedQuery, page);
  }, [debouncedQuery, page]);

  return (
    <main>
      <div className="pattern"></div>
      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="Hero Banner" />
          <h1>
            Find <span className="text-gradient">Movies</span> You'll Enjoy
            Without the Hassle
          </h1>

          <SearchBar query={query} setQuery={setQuery} />
        </header>

        {trendingMovies.length > 0 && (
          <section className="trending">
            <h2>Trending Movies</h2>
            <ul>
              {trendingMovies.map((movie, index) => (
                <li key={movie.$id}>
                  <p>{index + 1}</p>
                  <img src={movie.poster_url} alt={movie.title} />
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="all-movies mb-8">
          <h2 className="mt-[40px]">All Movies</h2>

          {loading ? (
            <div className="flex justify-center items-center">
              <span className="loader"></span>
            </div>
          ) : errorMsg ? (
            <p className="text-red-500">{errorMsg}</p>
          ) : (
            <ul>
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
        </section>

        <Pagination page={page} setPage={setPage} />
      </div>
    </main>
  );
};

export default Home;
