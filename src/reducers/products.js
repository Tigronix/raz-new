const updateProducts = (state, action) => {
  if (state === undefined) {
    return {
      products: [],
      productsLoading: null,
      productsError: null
    }
  }

  switch (action.type) {
    case 'GET_PRODUCTS_REQUEST':
      return {
        products: {},
        productsLoading: true,
        productsError: null
      };

    case 'GET_PRODUCTS_SUCCESS':
      return {
        products: action.payload,
        productsLoading: null,
        productsError: null
      };

    case 'GET_PRODUCTS_FAILURE':
      return {
        products: {},
        productsLoading: null,
        productsError: true
      };

    default:
      return state.products
  }
};

export default updateProducts;