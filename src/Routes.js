// Dependencies
import React from 'react';
import { Route, Switch } from 'react-router-dom';

// Components
import App from './Containers/App';
import Home from './Components/Modules/Home';
import NotFound from './Components/Partials/NotFound';

const Routes = () => (
  <App>
    {/*---- Routes Components ----*/}
    <Switch>
      <Route exact path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  </App>
)

export default Routes;
