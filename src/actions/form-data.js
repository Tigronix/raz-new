// submit form data
const submitRequested = () => {
  return {
    type: 'SUBMIT_FORM_REQUEST'
  };
};

const submitLoaded = (formData) => {
  return {
    type: 'SUBMIT_FORM_SUCCESS',
    payload: formData
  };
};

const submitError = (error) => {
  return {
    type: 'SUBMIT_FORM_FAILURE',
    payload: error
  }
};

const insertFormData = (razbiratorService, dispatch, formData) => {
  dispatch(submitRequested());
  razbiratorService.submitForm(formData)
    .then((data) => {
      dispatch(submitLoaded(data));
    })
    .catch((err) => {
      dispatch(submitError(err))
    });
};

export {
  insertFormData
};