import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { TabBar } from '../../components/Tabbar/TabBar';
export const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route pathname='/'>
          <TabBar />
        </Route>
      </Switch>
    </Router>
  );
};
