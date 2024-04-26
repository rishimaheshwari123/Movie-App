import React, { useState } from "react";
import { data } from "./data";
import Navbar from "./Navbar";

const Movie = () => {
  const [filteredData, setFilteredData] = useState(data);

  const handleSearch = (searchTerm) => {
    const filtered = data.filter((movie) =>
      movie.movietitle.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  };

  return (
    <div>
      <Navbar onSearch={handleSearch} />
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
