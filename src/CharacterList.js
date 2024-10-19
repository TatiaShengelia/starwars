import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Search from './Search';
import './CharacterList.css'

const CharacterList = () => {
  const [search, setSearch] = useState('')
  const [characters, setCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const fetchCharacters = async (page = 1, searchQuery = '') => {
    let url = `https://swapi.dev/api/people/?page=${page}`;
    if (searchQuery) {
      url += `&search=${searchQuery}`;
    }
    const response = await fetch(url);
    const data = await response.json();
    setCharacters(data.results);
    setTotalPages(Math.ceil(data.count / 10));
  };

  useEffect(() => {
    fetchCharacters(currentPage, search);
  }, [currentPage, search]);

  return (
    <div className='chracter-list'>
      <h1>Star Wars Characters</h1>
      <Search search={search}
        handleSearchChange={handleSearchChange} />
      <ul>
        {characters.map((character, index) => (
          <li key={index}>
            <Link to={`/character/${character.url.split('/')[5]}`} className='characters'>
              {character.name}
            </Link>
          </li>
        ))}
      </ul>
      <div>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className='list-button'
        >
          Previous
        </button>
        <span className='pages'>Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className='list-button'
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default CharacterList