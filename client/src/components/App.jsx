import React    from 'react';
import {Router} from "@reach/router";
import Dart2   from './Dart2';
import Darts2    from './Darts2';
import AddDart from './AddDart';

class App extends React.Component {

  render() {
    return (
      <Router>
        <Dart2   path='/' />
        <Darts2    path='/dart/:dartID' />
        <AddDart path='/add-dart/' />
      </Router>
    );
  }

}

export default App;
