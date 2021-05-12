

function* values(data) {
  for (let prop of Object.keys(data)) // own properties, you might use
    // for (let prop in obj)
    yield data[prop];
}



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
  bookstoreService.fetchFiles()
    .then((data) => {
      dispatch(filesLoaded(data))
    })
    .catch((err) => {
      console.log('BOOKSTORE ERR', err);
    });
};

const updateFiles = (bookstoreService, dispatch, files) => {
  dispatch(filesRequested());
  bookstoreService.getFiles(files)
    .then((data) => {
      // console.log('success', data);
      let arr = data;

      if (data.length != 0) {
        const newArr = [];
        arr = Array.from(values(data));

        arr.forEach(element => {
          newArr.push(element[0]);
        });
        arr = newArr;
      }

      dispatch(filesLoaded(arr))
    })
    .catch((err) => {
      console.log('BOOKSTORE ERR', err);
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