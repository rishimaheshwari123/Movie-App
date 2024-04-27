import React, { useState } from "react";
import { data } from "./data";
import Navbar from "./Navbar";

const Movie = () => {
  const [filteredData, setFilteredData] = useState(data);
  const [filters, setFilters] = useState({
    languages: [],
    genres: [],
  });

  const handleSearch = (searchTerm) => {
    const filtered = data.filter((movie) =>
      movie.movietitle.toLowerCase().includes(searchTerm.toLowerCase())
    );
    applyFilters(filtered);
  };

  const applyFilters = (movies) => {
    const filtered = movies.filter((movie) => {
      const languageMatch =
        filters.languages.length === 0 ||
        filters.languages.every((lang) => movie.movielanguages.includes(lang));
      const genreMatch =
        filters.genres.length === 0 ||
        filters.genres.every((genre) => movie.moviegenres.includes(genre));
      return languageMatch && genreMatch;
    });
    setFilteredData(filtered);
  };

  const handleFilterChange = (filterType, value) => {
    const updatedFilters = { ...filters, [filterType]: value };
    setFilters(updatedFilters);
    applyFilters(data);
  };

  return (
    <div>
      <Navbar onSearch={handleSearch} />
      <div className="filter-container">
        <h3>Filter by:</h3>
        <div className="genres">
          {[
            "Action",
            "Adventure",
            "Fantasy",
            "Documentary",
            "Crime",
            "Romance",
            "Thriller",
            "Biography",
            "Sport",
            "Comedy",
            "Drama",
            "Horror",
            "Mystery",
          ].map((genre) => (
            <label key={genre}>
              <input
                type="checkbox"
                onChange={(e) => {
                  const value = e.target.value;
                  const isChecked = e.target.checked;
                  handleFilterChange(
                    "genres",
                    isChecked
                      ? [...filters.genres, value]
                      : filters.genres.filter((g) => g !== value)
                  );
                }}
                value={genre}
              />
              {genre}
            </label>
          ))}
        </div>
      </div>
      <div className="movie-container">
        {filteredData.map((movie, index) => (
          <div key={index} className="movie-cart">
            <img
              src={movie.moviemainphotos[0]}
              alt={`${movie.movietitle} Poster`}
            />
            <div className="movie-details">
              <h2 className="title">{movie.movietitle}</h2>
              <p>
                <strong>Languages:</strong> {movie.movielanguages.join(" / ")}
              </p>
              <p>
                <strong>Countries:</strong> {movie.moviecountries.join(" / ")}
              </p>
              <p>
                <strong>Genres:</strong> {movie.moviegenres.join(" / ")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Movie;
