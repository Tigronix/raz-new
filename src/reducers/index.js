import updateCar from './car';
import getFiles from './file';
import updateCrop from './crop';
import updateFormData from './form-data';
import updateResetState from './reset-state';
import updateProducts from './products';
import updateProduct from './product';

const reducer = (state, action) => {
  // console.log('STATE', state);
  // console.log('ACTION', action);

  const isResetState = action.type === 'RESET_STATE';

  if(isResetState) {
    state = undefined;
  }

  return {
    car: updateCar(state, action),
    files: getFiles(state, action),
    crop: updateCrop(state, action),
    formData: updateFormData(state, action),
    redirect: updateResetState(state, action),
    products: updateProducts(state, action),
    product: updateProduct(state, action)
  };
};

export default reducer;
