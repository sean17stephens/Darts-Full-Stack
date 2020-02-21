import React              from 'react';
import urlToCurrentDomain from '../lib/urlToCurrentDomain';
import {Link}             from '@reach/router';
import * as Config        from '../config.json'

class Cakes extends React.Component {

  // #######################################################
  // # Local state
  // #######################################################

  state = {}

  // #######################################################
  // # Render
  // #######################################################

  render() {

    if (!this.state.dartsplayers && this.state.dartsplayersLoaded === true) {
      return (
        <p>Error loading Darts Players. Try again later.</p>
      );
    } else if (!this.state.dartsplayers) {
      return (
        <p>Loading Darts Players...</p>
      );
    } else if (this.state.dartsplayers.length === 0) {
      return (
        <p>Sorry, no Darts Players are available</p>
      );
    } else {
      return (
        <div>
          <h1>All Darts Players in the database</h1>
          <ul>
            {this.state.cakes.map(cake => (
              <li key={`dartsplayer_${dartsplayer._id}`}><Link to={`/dartsplayer/${dartsplayer._id}`}>{dartsplayer.title}</Link></li>
            ))}
          </ul>
          <p><Link to='/add-dartsplayer'>Add a new Darts Player</Link></p>
        </div>
      )
    }
  }

  componentDidMount() {
    fetch(urlToCurrentDomain(Config.dartsplayersAPI))
      .then (res  => res.json())
      .then (json => {
        this.setState({dartsplayers       : json});
        this.setState({dartsplayersLoaded : true});
      })
      .catch(err => {
        this.setState({dartsplayersLoaded: true});
      });
  }

}

export default DartsPlayers;

