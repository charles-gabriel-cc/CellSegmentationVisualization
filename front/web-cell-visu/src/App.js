import React from 'react'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Homepage from './pages/Homepage';
import Help from './pages/Help'

import './styles/global.css'


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Homepage} />
        <Route exact path='/help' component={Help} />
      </Switch>
    </Router>
  );
}

export default App;
