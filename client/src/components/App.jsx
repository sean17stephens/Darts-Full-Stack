import React    from 'react';
import {Router} from "@reach/router";
import DartsPlayers   from './DartsPlayers';
import DartsPlayer    from './DartsPlayer';
import AddDartsPlayer from './AddDartsPlayer';

class App extends React.Component {

  render() {
    return (
      <Router>
        <DartsPlayers   path='/' />
        <DartsPlayer    path='/darts/:dartsID' />
        <AddDartsPlayer path='/add-darts/' />
      </Router>
    );
  }

}

export default App;
