import React    from 'react';
import {Router} from "@reach/router";
import DartsPlayers   from './Darts';
import DartsPlayer    from './Dart';
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
