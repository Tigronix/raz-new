import updateCar from './car';
import getFiles from './file';
import updateCrop from './crop';
import updateFormData from './form-data';

const reducer = (state, action) => {
  console.log('STATE', state);
  // console.log('ACTION', action);
  return {
    car: updateCar(state, action),
    files: getFiles(state, action),
    crop: updateCrop(state, action),
    formData: updateFormData(state, action)
  };
};

export default reducer;
