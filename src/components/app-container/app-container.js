import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Router } from "react-router";
import { createBrowserHistory } from 'history';
import ShopHeader from '../shop-header';
import {
  Main,
  AddProductPage
} from '../pages';

import './app.css';
import { Component } from 'react';

class App extends Component {
  history = createBrowserHistory();

  componentWillMount() {
    this.unlisten = this.props.history.listen((location, action) => {
      console.log("on route change");
    });
  }
  componentWillUnmount() {
    this.unlisten();
  }

  render() {
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
  }
};

export default withRouter(App);
