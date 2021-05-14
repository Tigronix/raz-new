const updateFilesSuccess = (state, action) => {
  if (state.files.realFiles) {
    action.payload = [
      ...state.files.realFiles,
      ...action.payload
    ];
  } 

  return {
    files: [],
    realFiles: action.payload,
    loading: false,
    filesLoading: false,
    error: null,
  };
};

const getFiles = (state, action) => {
  if (state === undefined) {
    return {
      files: [],
      realFiles: [],
      loading: true,
      filesLoading: false,
      error: null,
    }
  }

  switch (action.type) {
    // fetch files
    case 'FETCH_FILES_REQUEST':
      return {
        files: [],
        loading: true,
        filesLoading: false,
        error: null,
      };

    case 'FETCH_FILES_SUCCESS':
      return {
        files: action.payload,
        loading: false,
        filesLoading: false,
        error: null,
      };

    case 'FETCH_FILES_FAILURE':
      return {
        files: [],
        loading: false,
        filesLoading: false,
        error: true,
      };

    // update files
    case 'UPDATE_FILES_REQUEST':
      return {
        files: [],
        realFiles: state.files.realFiles,
        loading: true,
        filesLoading: false,
        error: null,
      };

    case 'FILES_SELECTED':
      return {
        files: action.payload,
        realFiles: state.files.realFiles,
        loading: false,
        filesLoading: true,
        error: null,
      };

    case 'UPDATE_FILES_SUCCESS':
      return updateFilesSuccess(state, action);

    case 'UPDATE_FILES_FAILURE':
      return {
        files: [],
        realFiles: state.files.realFiles,
        loading: false,
        filesLoading: false,
        error: true,
      };

    default:
      return state.files
  }
};

export default getFiles;