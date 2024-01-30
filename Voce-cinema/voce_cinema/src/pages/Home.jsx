import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";

import "./MoviesGrid.css";

const apiKey = import.meta.env.VITE_API_KEY;

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: apiKey
    }
  };

const Home = () => {
  const [topMovies, setTopMovies] = useState([]);

  useEffect(() => {
    fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
    .then(response => response.json())
    .then(data => setTopMovies(data.results))
    .catch(err => console.error(err));
  }, []);

  console.log(topMovies);

  return (
    <div className="container">
      <h2 className="title">Melhores filmes:</h2>
      <div className="movies-container">
        {topMovies.length > 0 &&
          topMovies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>
    </div>
  );
};

export default Home;