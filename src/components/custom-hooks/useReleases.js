import { useState, useEffect } from 'react';
import { getRelease } from '../../services/musicBrainzApi';

const useReleases = (id, page) => {
  
  const [releases, setReleases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getRelease(id, page)
      .then(res => {
        setReleases(res);
        setLoading(false);
      });
  }, [page]);

  return { releases, loading };

};

export default useReleases;
