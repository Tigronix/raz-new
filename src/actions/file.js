import { objToArr } from '../utils';


// fetchFiles
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

// updateFiles
const updateFilesRequested = () => {
  return {
    type: 'UPDATE_FILES_REQUEST'
  };
};

const getFiles = (files) => {
  return {
    type: 'FILES_SELECTED',
    payload: files
  };
};

const updateFilesLoaded = (files) => {
  return {
    type: 'UPDATE_FILES_SUCCESS',
    payload: files
  };
};

const updateFilesError = (error) => {
  return {
    type: 'UPDATE_FILES_FAILURE',
    payload: error
  }
};

const updateFiles = (razbiratorService, dispatch, files) => {
  dispatch(updateFilesRequested());
  razbiratorService.getFiles(files)
    .then((data) => {
      let arr = data;

      if (data.length !== 0) {
        arr = Array.from(objToArr(data));
      }

      dispatch(updateFilesLoaded(arr))
    })
    .catch((err) => {
      dispatch(updateFilesError(err))
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