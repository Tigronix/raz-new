import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { withRazbiratorService } from '../hoc';
import {
  fetchProducts,
  resetState
} from '../../actions';
import { compose } from '../../utils';
import { Redirect, Link } from 'react-router-dom';
import Spinner from '../spinner/';
import ErrorIndicator from '../error-indicator/';

import './product-list.css';

const ProductList = ({
  products,
  data,
  renderRedirect
}) => {

  return (
    <Fragment>
      <h1>{data}</h1>
      <ul>
        {products.map((item) => {
          const { id, price, oem } = item;

          return <li key={id}>
            <h2>Id: {id}</h2>
            <div>Price: {price}</div>
            <div>OEM: {oem}</div>
              <Link className="btn btn-primary" onClick={() => renderRedirect(id)} to="/add-product">
                Добавить товар
             </Link>
          </li>
        })}
      </ul>
    </Fragment>
  )
};

class ProductListContainer extends Component {
  componentDidMount() {
    this.props.fetchProducts();
  }

  render() {
    const {
      productsLoading,
      productsError,
      products,
      data,
      renderRedirect
    } = this.props;

    if (productsLoading) {
      return <Spinner></Spinner>;
    }

    if (productsError) {
      return <ErrorIndicator></ErrorIndicator>
    }

    return <ProductList
      products={products}
      data={data}
      renderRedirect={renderRedirect}
    ></ProductList>
  }
}

const mapStateToProps = (
  {
    products: {
      products,
      productsLoading,
      productsError,
    },
    redirect: {
      data
    }
  }
) => {
  return {
    products,
    productsLoading,
    productsError,
    data
  };
};

const mapDispatchToProps = (dispatch, { razbiratorService }) => {
  return {
    fetchProducts: () => {
      return fetchProducts(razbiratorService, dispatch)
    },
    renderRedirect: (data) => {
      resetState(dispatch, data);
    }
  };
};

export default compose(
  withRazbiratorService(),
  connect(mapStateToProps, mapDispatchToProps)
)(ProductListContainer);