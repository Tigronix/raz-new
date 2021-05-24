const updateproduct = (state, action) => {
  if (state === undefined) {
    return {
      product: {},
      productLoading: null,
      productError: null
    }
  }

  switch (action.type) {
    case 'GET_PRODUCT_REQUEST':
      return {
        product: {},
        productLoading: true,
        productError: null
      };

    case 'GET_PRODUCT_SUCCESS':
      return {
        product: action.payload,
        productLoading: null,
        productError: null
      };

    case 'GET_PRODUCT_FAILURE':
      return {
        product: {},
        productLoading: null,
        productError: true
      };

    default:
      return state.product
  }
};

export default updateproduct;