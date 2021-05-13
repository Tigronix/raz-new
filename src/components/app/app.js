import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ShopHeader from '../shop-header';
import { AddProductPage } from '../pages';

import './app.css';

const App = () => {
  return (
    <main role="main" className="container">
      <ShopHeader numItems={5} total={210}/>
      <Switch>

          <Route
            path="/add-product"
            component={AddProductPage}
            />
      </Switch>
    </main>
  );
};

export default App;
