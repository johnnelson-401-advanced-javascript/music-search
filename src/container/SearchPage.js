import React, { Component } from 'react';
import ArtistList from '../components/Artist/ArtistList';
import Form from '../components/Form/Form';
import { callApi } from '../services/musicBrainzApi';

export default class SearchPage extends Component {
  state = {
    searchQuery: '',
    artists: [],
    page: 0
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  }

  getArtists = () => {
    callApi(this.state.searchQuery, this.state.page)
      .then(res => {
        const artists = res.artists.map(artist => {
          return {
            disamb: artist.disambiguation,
            name: artist.name,
            id: artist.id
          };
        });
        this.setState({ artists });
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.page !== this.state.page) {
      this.getArtists();
    }
  }


  handleSubmit = event => {
    event.preventDefault();
    this.getArtists();
  }

  handlePageBackward = () => {
    this.setState(state => {
      if(state.page > 0) {
        return ({ page: state.page - 1 });
      }
    });
  }

  handlePageForward = () => {
    this.setState(state => ({ page: state.page + 1 }));
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
