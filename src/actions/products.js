import {objToArr} from '../utils';

// fetch files
const productsGetRequested = () => {
  return {
    type: 'GET_PRODUCTS_REQUEST'
  };
};

const productsGetLoaded = (products) => {
  return {
    type: 'GET_PRODUCTS_SUCCESS',
    payload: products
  };
};

const productsGetError = (error) => {
  return {
    type: 'GET_PRODUCTS_FAILURE',
    payload: error
  }
};

const fetchProducts = (razbiratorService, dispatch) => {
  dispatch(productsGetRequested());
  razbiratorService.fetchProducts()
    .then((data) => {
      const dataArr = Array.from(objToArr(data));
      dispatch(productsGetLoaded(dataArr))
    })
    .catch((err) => {
      dispatch(productsGetError(err))
    });
};

export {
  fetchProducts
};