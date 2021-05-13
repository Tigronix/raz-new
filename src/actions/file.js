import { objToArr } from '../utils';


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

const fetchFiles = (razbiratorService, dispatch) => () => {
  dispatch(filesRequested());
  razbiratorService.fetchFiles()
    .then((data) => {
      dispatch(filesLoaded(data))
    })
    .catch((err) => {
      dispatch(filesError(err))
    });
};

const updateFiles = (razbiratorService, dispatch, files) => {
  dispatch(filesRequested());
  razbiratorService.getFiles(files)
    .then((data) => {
      let arr = data;

      if (data.length !== 0) {
        arr = Array.from(objToArr(data));
      }

      dispatch(filesLoaded(arr))
    })
    .catch((err) => {
      dispatch(filesError(err))
    });


  return {
    type: 'FILES_SELECTED',
    payload: files
  };
};

export {
  getFiles,
  fetchFiles,
  updateFiles
};