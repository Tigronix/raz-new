const getFiles = (state, action) => {
  if (state === undefined) {
    return {
      files: [],
      loading: true,
      error: null,
    }
  }

  switch (action.type) {
    case 'FETCH_FILES_REQUEST':
      return {
        files: [],
        loading: true,
        error: null,
      };

    case 'FETCH_FILES_SUCCESS':
      return {
        files: action.payload,
        loading: false,
        error: null,
      };

    case 'FETCH_FILES_FAILURE':
      return {
        files: [],
        loading: false,
        error: true,
      };

    case 'FILES_SELECTED':
      // console.log('FILES_SELECTED', action.payload);
      // console.log('FILES_SELECTED *****STATE****', state);

      // const newArr = [
      //   ...cartItems.slice(0, idx),
      //   item,
      //   ...cartItems.slice(idx + 1)
      // ]

      return {
        files: action.payload,
        loading: false,
        error: null,
      };

    default:
      return state.files
  }
};

export default getFiles;