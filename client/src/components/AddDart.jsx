import React              from 'react';
import {navigate, Link}   from '@reach/router';
import urlToCurrentDomain from '../lib/urlToCurrentDomain';
import * as Config        from '../config.json'

class AddDart extends React.Component {

  // #######################################################
  // # Local state
  // #######################################################

  state = {
    title     : ''
  }

  // #######################################################
  // # Render
  // #######################################################

  render() {

    if (this.state.reportedError) {
      return (
        <div>
          <h1>Error</h1>
          <p>Sorry, there was an error creating the darts player. The error was: {this.state.reportedError || 'Unknown'}</p>
          <a href='#' onClick={this.resetForRetry.bind(this)}>Try again</a>&nbsp;|&nbsp;
          <Link to='/'>Back to All players</Link>
        </div>
      );
    } else if (this.state.processingAdd) {
      return (
        <div>Adding player...</div>
      );
    } else {
      return (
        <div>
          <h1>Add a player</h1>
          <form onSubmit={this.handleSubmit.bind(this)}>

          <div>
              <label>Player Name:
                <input type='' value={this.state.title} onChange={this.handleTitleUpdate.bind(this)} />
              </label>
            </div>

            <div>
              <label>World Ranking:
                <input type='' value={this.state.ranking} onChange={this.handleRankingUpdate.bind(this)} />
              </label>
            </div>

            <div>
              <label>Country:
                <input type='' value={this.state.country} onChange={this.handleCountryUpdate.bind(this)} />
              </label>
            </div>

            <div>
              <input type='submit' value='Add Player' />
            </div>

          </form>
          <Link to='/'>Back to All players</Link>
        </div>
      );
    }
  }

  handleTitleUpdate(e) {
    this.setState({title: e.target.value || null});
  }

  handleRankingUpdate(e) {
    this.setState({ranking: e.target.value || null});
  }

  handleCountryUpdate(e) {
    this.setState({country: e.target.value || null});
  }

  handleSubmit(e) {

    // Prevent the default form submit action
    e.preventDefault();

    // Perform a POST call for the new data
    fetch(urlToCurrentDomain(`${Config.dartAPI}`), {
      method : 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        authoredBy: this.state.authoredBy,
        title     : this.state.title,
        content   : this.state.content
      })}
    )
      .then (res  => {
        if (res.status >= 400) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then (json => navigate(`/dart/${json._id}`))
      .catch(err => {
        this.setState({reportedError: err.message || 'Unknown'});
      })

  }

  resetForRetry() {
    this.setState({reportedError: null});
  }

  componentDidMount() {
    // this.getComments(this.props.cakeID);
  }

}

export default AddDart;