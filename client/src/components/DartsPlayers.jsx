import React              from 'react';
import urlToCurrentDomain from '../lib/urlToCurrentDomain';
import {Link}             from '@reach/router';
import * as Config        from '../config.json'

class DartsPlayers extends React.Component {

  // #######################################################
  // # Local state
  // #######################################################

  state = {}

  // #######################################################
  // # Render
  // #######################################################

  render() {

    if (!this.state.dart && this.state.dartLoaded === true) {
      return (
        <p>Error loading Darts Players. Try again later.</p>
      );
    } else if (!this.state.dart) {
      return (
        <p>Loading Darts Players...</p>
      );
    } else if (this.state.dart.length === 0) {
      return (
        <p>Sorry, no Darts Players are available</p>
      );
    } else {
      return (
        <div>
          <h1>All Darts Players in the database</h1>
          <ul>
            {this.state.dart.map(darts => (
              <li key={`darts_${darts._id}`}><Link to={`/darts/${darts._id}`}>{darts.title}</Link></li>
            ))}
          </ul>
          <p><Link to='/add-darts'>Add a new Darts Player</Link></p>
        </div>
      )
    }
  }

  componentDidMount() {
    fetch(urlToCurrentDomain(Config.dartAPI))
      .then (res  => res.json())
      .then (json => {
        this.setState({dart       : json});
        this.setState({dartLoaded : true});
      })
      .catch(err => {
        this.setState({dartLoaded: true});
      });
  }

}

export default DartsPlayers;

