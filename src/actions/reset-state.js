const resetSuccess = (page) => {
  return {
    type: 'RESET_STATE',
    action: page
  }
};

const resetState = (dispatch, page) => {
  dispatch(resetSuccess(page));
};

export {
  resetState
};