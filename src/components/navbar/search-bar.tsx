import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type PropType = {
  hasNavbarToggler: boolean;
};

function SearchBar(props: PropType) {
  return (
    <div className="search-bar input-group mx-auto form-inline">
      <input
        type="text"
        className="form-control"
        placeholder="Search"
        aria-label="Search"
        aria-describedby="basic-addon2"
      />
      <div className="input-group-append">
        <button
          type="button"
          className="btn btn-outline-secondary"
        >
          <FontAwesomeIcon icon="search" aria-hidden="true" />
        </button>
        {props.hasNavbarToggler && (
          <button
            className="btn btn-outline-secondary"
            type="button"
            data-toggle="collapse"
            data-target="#mainNavbarColappser"
            aria-controls="mainNavbarColappser"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        )}
      </div>
    </div>
  );
}

export default SearchBar;
