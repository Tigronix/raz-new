// get crop
const cropGetRequested = () => {
  return {
    type: 'GET_CROP_REQUEST'
  };
};

const cropGetLoaded = (crop) => {
  return {
    type: 'GET_CROP_SUCCESS',
    payload: crop
  };
};

const cropGetError = (error) => {
  return {
    type: 'GET_CROP_FAILURE',
    payload: error
  }
};

const getCropImage = (razbiratorService, dispatch, cropFile) => {
  dispatch(cropGetRequested());
  razbiratorService.getCrop(cropFile)
    .then((data) => {
      dispatch(cropGetLoaded(data))
    })
    .catch((err) => {
      dispatch(cropGetError(err))
    });
};


// update crop
const cropRequested = () => {
  return {
    type: 'UPDATE_CROP_REQUEST'
  };
};

const cropLoaded = (crop) => {
  return {
    type: 'UPDATE_CROP_SUCCESS',
    payload: crop
  };
};

const cropError = (error) => {
  return {
    type: 'UPDATE_CROP_FAILURE',
    payload: error
  }
};

const updateCropImage = (razbiratorService, dispatch, crop) => {
  dispatch(cropRequested());
  razbiratorService.updateCrop(crop)
    .then((data) => {
      dispatch(cropLoaded(data))
    })
    .catch((err) => {
      dispatch(cropError(err))
    });
};

export {
  updateCropImage,
  getCropImage
};