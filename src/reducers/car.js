const brandSelected = (state, action) => {
  let selectedModels = [];
  const { selectedBrand, models } = action;
  selectedBrand.forEach((brand) => {
    const { value } = brand;

    models.forEach((model) => {
      const { brandId } = model;

      if (brandId == value) {
        selectedModels.push(model);
      }
    })
  });

  return {
    brandOptions: action.brandOptions,
    selectedBrand: action.selectedBrand,
    models: action.models,
    selectedModels: selectedModels,
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
      selectedModels: [],
      loading: true,
      error: null,
    }
  }

  switch (action.type) {
    case 'FETCH_CAR_BRANDS_REQUEST':
      return {
        brandOptions: [],
        selectedBrand: [],
        models: [],
        selectedModels: [],
        loading: true,
        error: null
      };

    case 'FETCH_CAR_BRANDS_SUCCESS':
      return {
        brandOptions: action.carbrands,
        selectedBrand: [],
        models: [],
        selectedModels: [],
        loading: false,
        error: null
      };

    case 'FETCH_CAR_BRANDS_FAILURE':
      return {
        brandOptions: [],
        selectedBrand: [],
        models: [],
        selectedModels: [],
        loading: false,
        error: action.payload
      };

    case 'FETCH_CAR_MODELS_REQUEST':
      return {
        brandOptions: [],
        selectedBrand: [],
        models: [],
        selectedModels: [],
        loading: true,
        error: null
      };

    case 'FETCH_CAR_MODELS_SUCCESS':
      return {
        brandOptions: state.car.brandOptions,
        selectedBrand: [],
        selectedModels: [],
        models: action.models,
        loading: false,
        error: null
      };

    case 'FETCH_CAR_MODELS_FAILURE':
      return {
        brandOptions: state.carbrands,
        selectedBrand: [],
        models: [],
        selectedModels: [],
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