import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import ShopHeader from '../shop-header';

import { withRazbiratorService } from '../hoc';
import {
  compose
} from '../../utils';
import {
  resetState
} from '../../actions';

import {
  Main,
  AddProductPage
} from '../pages';

import './app.css';

class App extends Component {

  componentWillMount() {
    this.unlisten = this.props.history.listen((location, action) => {
     const currentPath = `${location.pathname}${location.search}${location.hash}`;
     this.props.renderRedirect(currentPath);
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

const mapStateToProps = (
  {
    redirect: { link },
  }
) => {
  return {
    link
  };
};

const mapDispatchToProps = (dispatch, { razbiratorService }) => {
  return {
    renderRedirect: () => {
      resetState(dispatch, '/');
    }
  };
};

export default compose(
  withRazbiratorService(),
  connect(mapStateToProps, mapDispatchToProps)
)(withRouter(App));
