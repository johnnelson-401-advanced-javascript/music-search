import React from 'react';
import PropTypes from 'prop-types';
import Artist from './Artist';

export default function ArtistList({ artists }) {

  const artistElements = artists.map(artist => (
    <li key={artist.id}>
      <Artist name={artist.name} id={artist.id}/>
    </li>
  ));

  return (
    <ul>
      {artistElements}
    </ul>
  );
}
ArtistList.propTypes = {
  artists: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired
};
