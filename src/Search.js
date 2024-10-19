import React, { useState } from 'react';
import './Search.css'

const Search = ({ search, handleSearchChange }) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={handleSearchChange}
        id='search'
      />
    </div>
  );
};


export default Search;
