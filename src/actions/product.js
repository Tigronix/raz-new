// get product
const productGetRequested = () => {
  return {
    type: 'GET_PRODUCT_REQUEST'
  };
};

const productGetLoaded = (product) => {
  return {
    type: 'GET_PRODUCT_SUCCESS',
    payload: product
  };
};

const productGetError = (error) => {
  return {
    type: 'GET_PRODUCT_FAILURE',
    payload: error
  }
};

const fetchProduct = (razbiratorService, dispatch, id) => {
  dispatch(productGetRequested());
  razbiratorService.fetchProduct(id)
    .then((data) => {
      dispatch(productGetLoaded(data))
    })
    .catch((err) => {
      dispatch(productGetError(err))
    });
};
export {
  fetchProduct
};