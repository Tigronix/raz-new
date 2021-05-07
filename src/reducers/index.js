import updateShoppingCart from './shopping-cart';
import updateBookList from './book-list';
import updateCar from './car';

const reducer = (state, action) => {
  return {
    bookList: updateBookList(state, action),
    shoppingCart: updateShoppingCart(state, action),
    car: updateCar(state, action),
  };
};

export default reducer;
