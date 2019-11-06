import React, { Component } from 'react';
import SongList from '../components/ReleaseDetail/SongList';
import { getSongsApi } from '../services/musicBrainzApi';
import PropTypes from 'prop-types';

export default class SongPage extends Component {

  static propTypes = {
    history: PropTypes.object.isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string,
        artist: PropTypes.string
      })
    })
  }

  state = {
    songs: [],
  }

  getSongs = () => {
    getSongsApi(this.props.match.params.id)
      .then(({ recordings }) => {
        this.setState({ songs: recordings.map(recording => {
          return recording.title;
        })
        });
      });
  }

  componentDidMount() {
    this.getSongs();
  }
  render() {
    return (
      <>
      <SongList songs={this.state.songs} artist={this.props.match.params.artist} />;
      </>
    );
  }
}
