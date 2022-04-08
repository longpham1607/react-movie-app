import React from "react";
import Movie from "./components/Movie";
import { useEffect, useState } from "react";
const FEATURED_API =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=99acf95471c500be4fedc98cf5c483f2&page=1";

const SEARCH_API =
  "https://api.themoviedb.org/3/search/movie?&api_key=99acf95471c500be4fedc98cf5c483f2&query=";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    fetch(FEATURED_API)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        setMovies(data.results);
      });
  }, []);
  const handleOnSubmit = function (e) {
    e.preventDefault();
    fetch(SEARCH_API + searchTerm)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        setMovies(data.results);
      });
    setSearchTerm("");
  };

  const handleOnChange = function (e) {
    setSearchTerm(e.target.value);
  };
  return (
    <>
      <header>
        <form onSubmit={handleOnSubmit}>
          <input
            className="search"
            placeholder="Search..."
            type="text"
            input={searchTerm}
            onChange={handleOnChange}
          />
        </form>
      </header>
      <div className="movie-container">
        {movies.map((movie) => (
          <Movie key={movie.id} {...movie} />
        ))}
      </div>
    </>
  );
}

export default App;
