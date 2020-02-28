import React              from 'react';
import urlToCurrentDomain from '../lib/urlToCurrentDomain';
import {Link}             from '@reach/router';
import * as Config        from '../config.json'

class Darts extends React.Component {

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
        <p>Error loading darts. Try again later.</p>
      );
    } else if (!this.state.darts) {
      return (
        <p>Loading darts...</p>
      );
    } else if (this.state.darts.length === 0) {
      return (
        <p>Sorry, no darts are available</p>
      );
    } else {
      return (
        <div>
        <div class="navbar">
        <ul>
          <li><a class="active" href="#home">Home</a></li>
          <li><a href="#news">News</a></li>
          <li><a href="#contact">Contact</a></li>
          <li><a href="#about">About</a></li>
        </ul>
        </div>
        <div class="style">
          <h1>All Players in the database</h1>
          <ul>
            {this.state.darts.map(dart => (
              <li key={`dart${dart._id}`}><Link to={`/dart/${dart._id}`}>{dart.title}</Link></li>
            ))}
          </ul>
          <p><Link to='/add-dart'>Add a new Player</Link></p>
        </div>
        </div>
      )
    }
  }

  componentDidMount() {
    fetch(urlToCurrentDomain(Config.dartsAPI))
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

export default Darts;
