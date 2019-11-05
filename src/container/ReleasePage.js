import React, { Component } from 'react';
import ReleaseDisplay from '../components/Release/ReleaseDisplay';
import { getRelease } from '../services/musicBrainzApi';
import PropTypes from 'prop-types';

export default class ReleasePage extends Component {

  static propTypes = {
    history: PropTypes.object.isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string
      })
    })
  }

  state = {
    releases: [],
    page: 0
  }

  componentDidMount() {
    getRelease(this.props.match.params.id)
      .then((res) => {
        const releases = res.releases.map(release => {
          const coverArt = 'cover-art-archive';
          return {
            title: release.title,
            imageUrl: release[coverArt].front ? `http://coverartarchive.org/release/${release.id}/front` : 'https://www.thesadsongco.com/media/images/notfound.jpg',
            id: release.id
          };
        });
        this.setState({ releases });
      });
  }


  handlePageBackward = () => {
    this.setState(state => {
      if(state.page > 1) {
        return ({ page: state.page - 1 });
      }
    }, () => {
      getRelease(this.props.match.params.id, this.state.page)
        .then((res) => {
          const releases = res.releases.map(release => {
            return {
              title: release.title,
              imageUrl: `http://coverartarchive.org/release/${release.id}/front`,
              id: release.id
            };
          });
          this.setState({ releases });
        });
    });
  }

  handlePageForward = () => {
    this.setState(state => ({ page: state.page + 1 }), () => {
      getRelease(this.props.match.params.id, this.state.page)
        .then((res) => {
          const releases = res.releases.map(release => {
            return {
              title: release.title,
              imageUrl: `http://coverartarchive.org/release/${release.id}/front`,
              id: release.id
            };
          });
          this.setState({ releases });
        });
    });
  }

  render() {
    return (
      <>
        <h1>Artist Releases</h1>
        <button onClick={this.handlePageBackward}>Previous</button>
        <button onClick={this.handlePageForward}>Next</button>
        <ReleaseDisplay releases={this.state.releases} />
      </>
    );

  }

}
