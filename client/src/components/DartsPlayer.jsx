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

    if (!this.state.darts && this.state.dartsLoaded === true) {
      return (
        <p>Error loading Darts Players. Try again later.</p>
      );
    } else if (!this.state.darts) {
      return (
        <p>Loading Darts Players...</p>
      );
    } else if (this.state.darts.length === 0) {
      return (
        <p>Sorry, no Darts Players are available</p>
      );
    } else {
      return (
        <div>
          <h1>{this.state.darts.title}</h1>
          <Link to='/'>Back to All Darts Players</Link>
        </div>
      )
    }
  }

  componentDidMount() {
    fetch(urlToCurrentDomain(`${Config.dartAPI}/${this.props.dartsID}`))
      .then (res  => res.json())
      .then (json => {
        this.setState({darts       : json});
        this.setState({dartsLoaded : true});
      })
      .catch(err => {
        this.setState({dartsLoaded: true});
      });
  }

}

export default DartsPlayer;
