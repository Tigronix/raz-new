import updateCar from './car';
import getFiles from './file';

const reducer = (state, action) => {
  return {
    car: updateCar(state, action),
    files: getFiles(state, action)
  };
};

export default reducer;
