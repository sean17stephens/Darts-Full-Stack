import React    from 'react';
import {Router} from "@reach/router";
import Darts    from './Darts';
import Dart   from './Dart';
import AddDart from './AddDart';

class App extends React.Component {

  render() {
    return (
      <Router>
        <Darts   path='/' />
        <Dart    path='/dart/:dartID' />
        <AddDart path='/add-dart/' />
      </Router>
    );
  }

}

export default App;
