import React, { useState, useEffect } from 'react';
import ReleaseList from '../Release/ReleaseList';
import { getRelease } from '../../services/musicBrainzApi';
import PropTypes from 'prop-types';

export default function ReleasePage({ match }) {

  ReleasePage.propTypes = {
    // history: PropTypes.object.isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string,
        artist: PropTypes.string
      })
    })
  };

  const [releases, setReleases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);


  const getReleaseAndCoverArt = () => {
    setLoading(true);
    getRelease(match.params.id, page)
      .then((res) => {
        const releases = res.releases.map(release => {
          const coverArt = 'cover-art-archive';
          return {
            title: release.title,
            imageUrl: release[coverArt].front ? `http://coverartarchive.org/release/${release.id}/front` : 'https://www.thesadsongco.com/media/images/notfound.jpg',
            id: release.id
          };
        });
        setReleases(releases);
        setLoading(false);
      });
  };

  useEffect(() => {
    getReleaseAndCoverArt();
  }, [page]);

  const handlePageBackward = () => {
    if(page > 0) {
      setPage(page - 1);
    }
  };

  const handlePageForward = () => {
    setPage(page + 1);
  };

  if(loading) return <img src='https://loading.io/spinners/music/lg.music-note-preloader.gif' />;

  return (
    <>
      <h1>Artist Releases</h1>
      <button onClick={handlePageBackward}>Previous</button>
      <button onClick={handlePageForward}>Next</button>
      <ReleaseList releases={releases} artist={match.params.artist} />
    </>
  );
}
