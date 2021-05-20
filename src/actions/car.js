import objToArr from '../utils/obj-to-arr';

// car brands
const carBrandsRequested = () => {
  return {
    type: 'FETCH_CAR_BRANDS_REQUEST'
  };
};

const carBrandsLoaded = (carbrands) => {
  return {
    type: 'FETCH_CAR_BRANDS_SUCCESS',
    carbrands: carbrands
  };
};

const carBrandsError = (error) => {
  return {
    type: 'FETCH_CAR_BRANDS_FAILURE',
    payload: error
  }
};

// car models
const carModelsRequested = () => {
  return {
    type: 'FETCH_CAR_MODELS_REQUEST'
  };
};

const carModelsLoaded = (models) => {
  return {
    type: 'FETCH_CAR_MODELS_SUCCESS',
    models: models
  };
};

const carModelsError = (error) => {
  return {
    type: 'FETCH_CAR_MODELS_FAILURE',
    payload: error
  }
};

const brandSelected = (brandOptions, selectedBrand, models, filteredModels) => {
  return {
    type: 'BRAND_SELECTED',
    payload: {
      brandOptions,
      selectedBrand,
      models,
      filteredModels
    }
  };
};

const modelsSelected = (selectedModels) => {
  return {
    type: 'MODELS_SELECTED',
    payload: selectedModels
  };
};

const fetchCarBrands = (razbiratorService, dispatch) => () => {
  dispatch(carBrandsRequested());
  razbiratorService.getResource('get-brands.php')
    .then((data) => {
      const arr = Array.from(objToArr(data));
      const result = arr.map(({ id: value, name: label }) => ({ value, label }));

      dispatch(carBrandsLoaded(result))
    })
    .catch((err) => {
      dispatch(carBrandsError(err))
    });
};

const fetchCarModels = (razbiratorService, dispatch) => () => {
  dispatch(carModelsRequested());
  razbiratorService.getResource('get-models.php')
    .then((data) => {
      const arr = Array.from(objToArr(data));
      const result = arr.map(({ id: value, name: label, brand_id: brandId }) => ({ value, label, brandId }));

      dispatch(carModelsLoaded(result))
    })
    .catch((err) => {
      dispatch(carModelsError(err))
    });
};

export {
  fetchCarBrands,
  fetchCarModels,
  brandSelected,
  modelsSelected
};