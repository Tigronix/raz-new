const brandSelected = (state, action) => {
  let filteredModels = [];
  const { selectedBrand, models } = action;
  selectedBrand.forEach((brand) => {
    const { value } = brand;

    models.forEach((model) => {
      const { brandId } = model;

      if (brandId === value) {
        filteredModels.push(model);
      }
    })
  });

  return {
    brandOptions: action.brandOptions,
    selectedBrand: action.selectedBrand,
    models: action.models,
    filteredModels: filteredModels,
    selectedModels: action.selectedModels,
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
      filteredModels: [],
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
        filteredModels: [],
        selectedModels: state.car.selectedModels,
        loading: true,
        error: null
      };

    case 'FETCH_CAR_BRANDS_SUCCESS':
      return {
        brandOptions: action.carbrands,
        selectedBrand: [],
        models: [],
        filteredModels: [],
        selectedModels: state.car.selectedModels,
        loading: false,
        error: null
      };

    case 'FETCH_CAR_BRANDS_FAILURE':
      return {
        brandOptions: [],
        selectedBrand: [],
        models: [],
        filteredModels: [],
        selectedModels: state.car.selectedModels,
        loading: false,
        error: action.payload
      };

    case 'FETCH_CAR_MODELS_REQUEST':
      return {
        brandOptions: [],
        selectedBrand: [],
        models: [],
        filteredModels: [],
        selectedModels: state.car.selectedModels,
        loading: true,
        error: null
      };

    case 'FETCH_CAR_MODELS_SUCCESS':
      return {
        brandOptions: state.car.brandOptions,
        selectedBrand: [],
        filteredModels: [],
        selectedModels: state.car.selectedModels,
        models: action.models,
        loading: false,
        error: null
      };

    case 'FETCH_CAR_MODELS_FAILURE':
      return {
        brandOptions: state.carbrands,
        selectedBrand: [],
        models: [],
        filteredModels: [],
        selectedModels: state.car.selectedModels,
        loading: false,
        error: action.payload
      };

    case 'BRAND_SELECTED':
      return brandSelected(state, action.payload);

    case 'MODELS_SELECTED':
      return {
        brandOptions: state.car.brandOptions,
        selectedBrand: state.car.selectedBrand,
        models: state.car.models,
        filteredModels: state.car.filteredModels,
        selectedModels: action.payload,
        loading: null,
        error: null
      }
    case 'MODELS_CLEAR':
      return {
        brandOptions: state.car.brandOptions,
        selectedBrand: state.car.selectedBrand,
        models: state.car.models,
        filteredModels: [],
        selectedModels: [],
        loading: null,
        error: null
      }

    default:
      return state.car
  }
};

export default updateCar;