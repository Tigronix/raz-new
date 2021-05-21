import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withRazbiratorService } from '../hoc';
import {
  fetchProducts
} from '../../actions';
import { compose } from '../../utils';
import Spinner from '../spinner/';
import ErrorIndicator from '../error-indicator/';

import './product-list.css';

const ProductList = ({
  products
}) => {
  console.log('COMPONENT', products);

  return (
    <ul>
      {products.map((item) => {
        const { id, price, oem } = item;

        return <li>
          <h2>Id: {id}</h2>
          <div>Price: {price}</div>
          <div>OEM: {oem}</div>
        </li>
      })}
    </ul>
  )
};

class ProductListContainer extends Component {
  componentDidMount() {
    console.log(this);
    this.props.fetchProducts();
  }

  render() {
    const {
      productsLoading,
      productsError,
      products
    } = this.props;

    if (productsLoading) {
      return <Spinner></Spinner>;
    }

    if (productsError) {
      return <ErrorIndicator></ErrorIndicator>
    }

    return <ProductList
      products={products}
    ></ProductList>
  }
}

const mapStateToProps = (
  {
    products: {
      products,
      productsLoading,
      productsError,
    }
  }
) => {
  return {
    products,
    productsLoading,
    productsError
  };
};

const mapDispatchToProps = (dispatch, { razbiratorService }) => {
  return {
    fetchProducts: () => {
      return fetchProducts(razbiratorService, dispatch)
    }
  };
};

export default compose(
  withRazbiratorService(),
  connect(mapStateToProps, mapDispatchToProps)
)(ProductListContainer);