const booksRequested = () => {
  return {
    type: 'FETCH_BOOKS_REQUEST'
  }
};

const booksLoaded = (newBooks) => {
  return {
    type: 'FETCH_BOOKS_SUCCESS',
    payload: newBooks
  };
};

const booksError = (error) => {
  return {
    type: 'FETCH_BOOKS_FAILURE',
    payload: error
  }
};

const fetchBooks = (bookstoreService, dispatch) => () => {
  dispatch(booksRequested());
  bookstoreService.getBooks()
    .then((data) => dispatch(booksLoaded(data)))
    .catch((err) => dispatch(booksError(err)));
};

export const bookAddedToCart = (bookId) => {
  return {
    type: 'BOOK_ADDED_TO_CART',
    payload: bookId
  };
};

export const bookRemovedFromCart = (bookId) => {
  return {
    type: 'BOOK_REMOVED_FROM_CART',
    payload: bookId
  };
};

export const allBooksRemovedFromCart = (bookId) => {
  return {
    type: 'ALL_BOOKS_REMOVED_FROM_CART',
    payload: bookId
  };
};

// cars
const carBrandsRequested = () => {
  return {
    type: 'FETCH_CAR_BRANDS_REQUEST'
  };
};

const carBrandsLoaded = (newModels) => {
  return {
    type: 'FETCH_CAR_BRANDS_SUCCESS',
    payload: newModels
  };
};

const carBrandsError = (error) => {
  return {
    type: 'FETCH_CAR_BRANDS_FAILURE',
    payload: error
  }
};

const fetchCarBrands = (bookstoreService, dispatch) => () => {
  dispatch(carBrandsRequested());
  bookstoreService.getCarBrands()
    .then((data) => dispatch(carBrandsLoaded(data)))
    .catch((err) => dispatch(carBrandsError(err)));
};

export const brandSelected = (brandOptions, selectedBrand) => {
  return {
    type: 'BRAND_SELECTED',
    payload: {
      brandOptions,
      selectedBrand
    }
  };
};

export {
  fetchBooks,
  fetchCarBrands
};
