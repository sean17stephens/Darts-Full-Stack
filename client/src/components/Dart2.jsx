import React              from 'react';
import {Link}             from '@reach/router';
import urlToCurrentDomain from '../lib/urlToCurrentDomain';
import * as Config        from '../config.json'

class Dart2 extends React.Component {

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
        <p>Error loading players. Try again later.</p>
      );
    } else if (!this.state.dart) {
      return (
        <p>Loading players...</p>
      );
    } else if (this.state.dart.length === 0) {
      return (
        <p>Sorry, no players are available</p>
      );
    } else {
      return (
        <div>
          <h1>{this.state.dart.title}</h1>
          <Link to='/'>Back to All players</Link>
        </div>
      )
    }
  }

  componentDidMount() {
    fetch(urlToCurrentDomain(`${Config.dartAPI}/${this.props.dartID}`))
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

export default Dart2;
