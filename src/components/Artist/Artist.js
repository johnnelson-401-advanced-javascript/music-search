import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function Artist({ name, id }) {
  return (
    <Link to={`/artist/${id}`}>
      <h2>{name}</h2>
    </Link>
  );
}
Artist.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
};
