import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './CharacterView.css'

const CharacterView = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [films, setFilms] = useState([]);
  const [species, setSpecies] = useState([]);
  const [starships, setStarships] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [filmsVisible, setFilmsVisible] = useState(false);
  const [speciesVisible, setSpeciesVisible] = useState(false);
  const [starshipsVisible, setStarshipsVisible] = useState(false);
  const [vehiclesVisible, setVehiclesVisible] = useState(false);

  const fetchCharacter = async () => {
    const response = await fetch(`https://swapi.dev/api/people/${id}/`);
    const data = await response.json();
    setCharacter(data);

    setFilms(await fetchRelatedData(data.films));
    setSpecies(await fetchRelatedData(data.species));
    setStarships(await fetchRelatedData(data.starships));
    setVehicles(await fetchRelatedData(data.vehicles));
  };

  const fetchRelatedData = async (urls) => {
    const data = await Promise.all(urls.map(url => fetch(url).then(res => res.json())));
    return data;
  };

  useEffect(() => {
    fetchCharacter();
  }, [id]);

  if (!character) {
    return <div>Loading...</div>;
  }

  const toggleVisibility = (section) => {
    switch (section) {
      case 'films':
        setFilmsVisible((prev) => !prev);
        break;
      case 'species':
        setSpeciesVisible((prev) => !prev);
        break;
      case 'starships':
        setStarshipsVisible((prev) => !prev);
        break;
      case 'vehicles':
        setVehiclesVisible((prev) => !prev);
        break;
      default:
        break;
    }
  };
  return (
    <div>
      <h1>{character.name}</h1>
      <p><strong>Height:</strong> {character.height}</p>
      <p><strong>Mass:</strong> {character.mass}</p>
      <p><strong>Hair Color:</strong> {character.hair_color}</p>
      <p><strong>Skin Color:</strong> {character.skin_color}</p>
      <p><strong>Eye Color:</strong> {character.eye_color}</p>
      <p><strong>Birth Year:</strong> {character.birth_year}</p>
      <p><strong>Gender:</strong> {character.gender}</p>

      <button onClick={() => toggleVisibility('films')} className='view-button'>
        {filmsVisible ? 'Hide Films' : 'Show Films'}
      </button>
      {filmsVisible && (
        <ul>
          {films.map((film, index) => (
            <li key={index}>{film.title}</li>
          ))}
        </ul>
      )}

      <button onClick={() => toggleVisibility('species')} className='view-button'>
        {speciesVisible ? 'Hide Species' : 'Show Species'}
      </button>
      {speciesVisible && (
        <ul>
          {species.map((sp, index) => (
            <li key={index}>{sp.name}</li>
          ))}
        </ul>
      )}

      <button onClick={() => toggleVisibility('starships')} className='view-button'>
        {starshipsVisible ? 'Hide Starships' : 'Show Starships'}
      </button>
      {starshipsVisible && (
        <ul>
          {starships.map((starship, index) => (
            <li key={index}>{starship.name}</li>
          ))}
        </ul>
      )}

      <button onClick={() => toggleVisibility('vehicles')} className='view-button'>
        {vehiclesVisible ? 'Hide Vehicles' : 'Show Vehicles'}
      </button>
      {vehiclesVisible && (
        <ul>
          {vehicles.map((vehicle, index) => (
            <li key={index}>{vehicle.name}</li>
          ))}
        </ul>
      )}

      <Link to="/" className='back-to-list'>Back to List</Link>
    </div>
  )
}

export default CharacterView