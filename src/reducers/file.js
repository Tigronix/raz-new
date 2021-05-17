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
    rejectedFiles: state.files.rejectedFiles
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
        rejectedFiles: state.files.rejectedFiles
      };

    case 'FILES_SELECTED':
      return {
        files: action.payload,
        realFiles: state.files.realFiles,
        loading: false,
        filesLoading: true,
        error: null,
        rejectedFiles: state.files.rejectedFiles
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

    // fetch real files
    case 'FETCH_REAL_FILES':
      return {
        files: state.files.files,
        realFiles: state.files.realFiles,
        loading: false,
        filesLoading: false,
        error: false
      };

    case 'REORDER_REAL_FILES':
      return {
        files: state.files.files,
        realFiles: action.payload,
        loading: false,
        filesLoading: false,
        error: false
      };
      
    // update rejected files
    case 'UPDATE_REJECTED_FILES':
      console.log(`UPDATE_REJECTED_FILES`, action.payload)
      return {
        files: state.files.files,
        realFiles: state.files.realFiles,
        loading: false,
        filesLoading: false,
        error: false,
        rejectedFiles: action.payload
      };
    

    default:
      return state.files
  }
};

export default getFiles;