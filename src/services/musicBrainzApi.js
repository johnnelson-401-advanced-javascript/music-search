

export const callApi = (searchQuery, page = 1) => {

  const url = `http://musicbrainz.org/ws/2/artist?query=${searchQuery}&fmt=json&limit=25&offset=${page * 25}`;

  return fetch(url)
    .then(res => res.json())
    .catch(error => {
      console.log(error);
    });
};
