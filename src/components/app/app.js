import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ShopHeader from '../shop-header';
import {
  Main,
  AddProductPage
} from '../pages';

import './app.css';

const App = () => {
  return (
    <main role="main" className="container">
      <ShopHeader numItems={5} total={210} />
      <Switch>
        <Route
          path="/"
          component={Main}
          exact
        />
        <Route
          path="/add-product"
          component={AddProductPage}
        />
      </Switch>
    </main>
  );
};

export default App;
