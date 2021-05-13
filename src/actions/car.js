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

const brandSelected = (brandOptions, selectedBrand, models, selectedModels) => {
  return {
    type: 'BRAND_SELECTED',
    payload: {
      brandOptions,
      selectedBrand,
      models,
      selectedModels
    }
  };
};

const fetchCarBrands = (razbiratorService, dispatch) => () => {
  dispatch(carBrandsRequested());
  razbiratorService.getCarBrands()
    .then((data) => dispatch(carBrandsLoaded(data)))
    .catch((err) => dispatch(carBrandsError(err)));
};

const fetchCarModels = (razbiratorService, dispatch) => () => {
  dispatch(carModelsRequested());
  razbiratorService.getCarModels()
    .then((data) => {
      dispatch(carModelsLoaded(data))
    })
    .catch((err) => {
      dispatch(carModelsError(err))
    });
};

export {
  fetchCarBrands,
  fetchCarModels,
  brandSelected
};