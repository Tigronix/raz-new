const updateCrop = (state, action) => {
  if (state === undefined) {
    return {
      crop: {},
      loading: null,
      error: null
    }
  }

  switch (action.type) {
    // fetch files
    case 'UPDATE_CROP_REQUEST':
      return {
        crop: {},
        loading: true,
        error: null
      };

    case 'UPDATE_CROP_SUCCESS':
      return {
        crop: action.payload,
        loading: null,
        error: null
      };

    case 'UPDATE_CROP_FAILURE':
      return {
        crop: {},
        loading: null,
        error: true
      };

    default:
      return state.crop
  }
};

export default updateCrop;