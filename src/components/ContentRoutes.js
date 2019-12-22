import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Application from '../components/pages/application/application';
import Privacy from '../components/footer/Privacy';
import Terms from '../components/footer/Terms';

const ContentRoutes = () => {
  return (
    <Switch>
      <Route exact path="/app" component={Application} />
      <Route exact path="/privacy" component={Privacy} />
      <Route exact path="/terms-of-use" component={Terms} />
    </Switch>
  );
};

export default ContentRoutes;