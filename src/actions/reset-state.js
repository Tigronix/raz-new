const resetSuccess = (data) => {
  return {
    type: 'RESET_STATE',
    payload: data
  }
};

const resetState = (dispatch, data) => {
  dispatch(resetSuccess(data));
};

export {
  resetState
};