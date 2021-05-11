import updateShoppingCart from './shopping-cart';
import updateBookList from './book-list';
import updateCar from './car';
import getFiles from './file';

const reducer = (state, action) => {
  return {
    bookList: updateBookList(state, action),
    shoppingCart: updateShoppingCart(state, action),
    car: updateCar(state, action),
    files: getFiles(state, action)
  };
};

export default reducer;
