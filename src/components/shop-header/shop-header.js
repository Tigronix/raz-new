import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { withRazbiratorService } from '../hoc';
import {
  resetState
} from '../../actions';
import { compose } from '../../utils';
import { Redirect, Link, NavLink } from 'react-router-dom';


import './shop-header.css';

const ShopHeader = ({
  renderRedirect
}) => {
  return (
    <header className="shop-header row">
      <NavLink activeClassName="active" className="btn btn-primary" onClick={() => renderRedirect()} to="/" exact>Главная</NavLink>
      <NavLink activeClassName="active" className="btn btn-primary" onClick={() => renderRedirect()} to="/add-product" exact>
        Добавить товар
      </NavLink>
    </header>
  );
};

class ShopHeaderContainer extends Component {
  componentDidMount() {
    
  }

  render() {
    const {
      data,
      renderRedirect
    } = this.props;

    return <ShopHeader
      data={data}
      renderRedirect={renderRedirect}
    ></ShopHeader>
  }
}

const mapStateToProps = (
  {
    redirect: {
      data
    }
  }
) => {
  return {
    data
  };
};

const mapDispatchToProps = (dispatch, { razbiratorService }) => {
  return {
    renderRedirect: (data) => {
      resetState(dispatch, data);
    }
  };
};

export default compose(
  withRazbiratorService(),
  connect(mapStateToProps, mapDispatchToProps)
)(ShopHeaderContainer);
