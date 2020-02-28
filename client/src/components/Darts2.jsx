import React              from 'react';
import urlToCurrentDomain from '../lib/urlToCurrentDomain';
import {Link}             from '@reach/router';
import * as Config        from '../config.json'

class Darts2 extends React.Component {

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
        <p>Error loading players. Try again later.</p>
      );
    } else if (!this.state.darts) {
      return (
        <p>Loading players...</p>
      );
    } else if (this.state.darts.length === 0) {
      return (
        <p>Sorry, no players are available</p>
      );
    } else {
      return (
        <div>
          <h1>All Players in the database</h1>
          <ul>
            {this.state.darts.map(dart => (
              <li key={`dart_${dart._id}`}><Link to={`/dart/${dart._id}`}>{dart.title}</Link></li>
            ))}
          </ul>
          <p><Link to='/add-cake'>Add a new player</Link></p>
        </div>
      )
    }
  }

  componentDidMount() {
    fetch(urlToCurrentDomain(Config.dartAPI))
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

export default Darts2;

