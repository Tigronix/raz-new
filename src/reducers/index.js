import updateCar from './car';
import getFiles from './file';

const reducer = (state, action) => {
  console.log('STATE', state);
  console.log('ACTION', action);
  return {
    car: updateCar(state, action),
    files: getFiles(state, action)
  };
};

export default reducer;
