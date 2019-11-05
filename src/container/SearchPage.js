import React, { Component } from 'react';
import ArtistList from '../components/Artist/ArtistList';
import Form from '../components/Form/Form';
import { callApi } from '../services/musicBrainzApi';

export default class SearchPage extends Component {
  state = {
    searchQuery: '',
    artists: [],
    page: 1
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  }

  handleSubmit = event => {
    event.preventDefault();
    callApi(this.state.searchQuery)
      .then(res => {
        const artists = res.artists.map(artist => {
          return {
            name: artist.name,
            id: artist.id
          };
        });
        this.setState({ artists });
      });
  }

  handlePageBackward = () => {
    this.setState(state => {
      if(state.page > 1) {
        return ({ page: state.page - 1 });
      }
    }, () => {
      callApi(this.state.searchQuery, this.state.page)
        .then((artistsArray) => {
          const artists = artistsArray.map(artist => {
            return {
              name: artist.name,
              id: artist.id
            };
          });
          this.setState({ artists });
        });
    });
  }

  handlePageForward = () => {
    this.setState(state => ({ page: state.page + 1 }), () => {
      callApi(this.state.searchQuery, this.state.page)
        .then((artistsArray) => {
          const artists = artistsArray.map(artist => {
            return {
              name: artist.name,
              id: artist.id
            };
          });
          this.setState({ artists });
        });
    });
  }

  render() {
    return (
      <>
        <Form
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          searchQuery={this.state.searchQuery} />
        <ArtistList
          artists={this.state.artists}
          handlePageForward={this.handlePageForward}
          handlePageBackward={this.handlePageBackward} />
      </>

    );

  }

}
