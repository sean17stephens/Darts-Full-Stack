import React              from 'react';
import {Link}             from '@reach/router';
import urlToCurrentDomain from '../lib/urlToCurrentDomain';
import * as Config        from '../config.json'
import '../components/sass/Main.scss'

class Dart extends React.Component {

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
        <p>Error loading darts. Try again later.</p>
      );
    } else if (!this.state.dart) {
      return (
        <p>Loading darts...</p>
      );
    } else if (this.state.dart.length === 0) {
      return (
        <p>Sorry, no darts are available</p>
      );
    } else {
      return (
        <div>
          <h1>{this.state.dart.title}</h1>
          <h1>{this.state.dart.ranking}</h1>
          <h1>{this.state.dart.country}</h1>
          <Link to='/'>Back to All darts</Link>
        </div>
      )
    }
  }

  componentDidMount() {
    fetch(urlToCurrentDomain(`${Config.dartsAPI}/${this.props.dartID}`))
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

export default Dart;

