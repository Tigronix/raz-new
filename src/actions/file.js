// car models
const filesRequested = () => {
  return {
    type: 'FETCH_FILES_REQUEST'
  };
};

const filesLoaded = (files) => {
  return {
    type: 'FETCH_FILES_SUCCESS',
    payload: files
  };
};

const filesError = (error) => {
  return {
    type: 'FETCH_FILES_FAILURE',
    payload: error
  }
};

const getFiles = (files) => {
  return {
    type: 'FILES_SELECTED',
    payload: files
  };
};

const fetchFiles = (bookstoreService, dispatch) => () => {
  dispatch(filesRequested());
  bookstoreService.getFiles()
    .then((data) => {
      dispatch(filesLoaded(data))
    })
    .catch((err) => {
      dispatch(filesError(err))
    });
};

export {
  getFiles,
  fetchFiles
};