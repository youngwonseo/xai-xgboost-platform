import React from 'react';
import { Route, Switch  } from 'react-router-dom';

import MainPage from './pages/MainPage';

const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={MainPage}/> 
    </Switch>
  );
}

export default App;
