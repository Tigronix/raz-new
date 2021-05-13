const getFiles = (state, action) => {
  if (state === undefined) {
    return {
      files: [],
      loading: true,
      filesLoading: false,
      error: null,
    }
  }

  switch (action.type) {
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

    case 'FILES_SELECTED':
      return {
        files: action.payload,
        loading: false,
        filesLoading: true,
        error: null,
      };

    default:
      return state.files
  }
};

export default getFiles;