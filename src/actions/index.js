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
const carModelsRequested = () => {
  return {
    type: 'FETCH_CAR_MODELS_REQUEST'
  };
};

const carModelsLoaded = (newModels) => {
  return {
    type: 'FETCH_CAR_MODELS_SUCCESS',
    payload: newModels
  };
};

const carModelsError = (error) => {
  return {
    type: 'FETCH_CAR_MODELS_FAILURE',
    payload: error
  }
};

const fetchCarModels = (bookstoreService, dispatch) => () => {
  dispatch(carModelsRequested());
  bookstoreService.getCarBrands()
    .then((data) => dispatch(carModelsLoaded(data)))
    .catch((err) => dispatch(carModelsError(err)));
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
  fetchCarModels
};
