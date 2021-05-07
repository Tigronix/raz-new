const brandSelected = (state, action) => {

  
  return {
    brandOptions: action.brandOptions,
    selectedBrand: action.selectedBrand,
    models: action.models,
    loading: false,
    error: null
  }
};

const updateCar = (state, action) => {
  if (state === undefined) {
    return {
      brandOptions: [],
      selectedBrand: [],
      models: [],
      loading: true,
      error: null,
    }
  }

  switch (action.type) {
    case 'FETCH_CAR_MODELS_REQUEST':
      return {
        brandOptions: [],
        selectedBrand: [],
        models: [],
        loading: true,
        error: null
      };

    case 'FETCH_CAR_MODELS_SUCCESS':
      return {
        brandOptions: action.payload,
        selectedBrand: [],
        models: [],
        loading: false,
        error: null
      };

    case 'FETCH_CAR_MODELS_FAILURE':
      return {
        brandOptions: [],
        selectedBrand: [],
        models: [],
        loading: false,
        error: action.payload
      };

    case 'BRAND_SELECTED':
      return brandSelected(state, action.payload);

    default:
      return state.car
  }
};

export default updateCar;