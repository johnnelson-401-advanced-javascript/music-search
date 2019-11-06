import React, { Component } from 'react';
import Lyrics from '../components/lyrics/Lyrics';
import { getLyrics } from '../services/lyricsApi';
import PropTypes from 'prop-types';

export default class ReleasePage extends Component {

  static propTypes = {
    history: PropTypes.object.isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        title: PropTypes.string,
        artist: PropTypes.string
      })
    })
  }

  state = {
    lyrics: ''
  }

  fetchLyrics = () => {
    getLyrics(this.props.match.params.title, this.props.match.params.artist)
      .then((res) => {
        this.setState({ lyrics: res.lyrics });
      });
  }

  componentDidMount() {
    this.fetchLyrics();
  }

  render() {
    return (
      <Lyrics title={this.props.match.params.title} lyrics={this.state.lyrics} artist={this.props.match.params.artist} />
    );

  }

}
