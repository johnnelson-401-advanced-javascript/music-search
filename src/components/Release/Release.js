import React from 'react';
import PropTypes from 'prop-types';

export default function Release({ title, imageUrl }) {
  return (
    <>
      <h3>{title}</h3>
      <img src={imageUrl} alt={title} />
    </>
  );
}

Release.propTypes = {
  title: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired
};
