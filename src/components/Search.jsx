import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import classNames from "classnames";
import "../assets/styles/components/Search.scss";

const Search = ({ isHome, available_videos }) => {
  const inputStyle = classNames("input", {
    isHome,
  });

  const [showResults, setShowResults] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const searchVideos = (event) => {
    setSearchResults(
      available_videos.filter((video) =>
        video.title.toLowerCase().includes(event.target.value)
      )
    );
    setShowResults(event.target.value.length > 3);
  };

  return (
    <section className="main">
      <h2 className="main__title">¿Qué quieres ver hoy?</h2>
      <input
        type="text"
        className={inputStyle}
        placeholder="Buscar..."
        onChange={searchVideos}
      />
      {showResults && (
        <div className="search-results">
          <ul>
            {searchResults.length === 0 ? (
              <li>Sin resultados</li>
            ) : (
              searchResults.map((item) => (
                <li className="result">
                  <Link to={`/player/${item.id}`}>
                    {item.title}
                  </Link>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </section>
  );
};

const mapStateToProps = (state) => {
  return {
    available_videos: [...state.trends, ...state.originals],
  };
};

export default connect(mapStateToProps, null)(Search);