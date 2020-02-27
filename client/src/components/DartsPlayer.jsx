import React              from 'react';
import {Link}             from '@reach/router';
import urlToCurrentDomain from '../lib/urlToCurrentDomain';
import * as Config        from '../config.json'

class DartsPlayer extends React.Component {

  // #######################################################
  // # Local state
  // #######################################################

  state = {}

  // #######################################################
  // # Render
  // #######################################################

  render() {

    if (!this.state.dartsplayer && this.state.dartsplayerLoaded === true) {
      return (
        <p>Error loading Darts Players. Try again later.</p>
      );
    } else if (!this.state.dartsplayer) {
      return (
        <p>Loading Darts Players...</p>
      );
    } else if (this.state.dartsplayer.length === 0) {
      return (
        <p>Sorry, no Darts Players are available</p>
      );
    } else {
      return (
        <div>
          <h1>{this.state.dartsplayer.title}</h1>
          <Link to='/'>Back to All Darts Players</Link>
        </div>
      )
    }
  }

  componentDidMount() {
    fetch(urlToCurrentDomain(`${Config.dartsplayerAPI}/${this.props.dartsplayerID}`))
      .then (res  => res.json())
      .then (json => {
        this.setState({dartsplayer       : json});
        this.setState({dartsplayerLoaded : true});
      })
      .catch(err => {
        this.setState({dartsplayerLoaded: true});
      });
  }

}

export default DartsPlayer;
