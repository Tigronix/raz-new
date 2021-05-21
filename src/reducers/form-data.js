const updateFormData = (state, action) => {
  if (state === undefined) {
    return {
      formData: [],
      formDataLoading: null,
      formDataError: null
    }
  }

  switch (action.type) {
    case 'SUBMIT_FORM_REQUEST':
      return {
        formData: {},
        formDataLoading: true,
        formDataError: null
      };

    case 'SUBMIT_FORM_SUCCESS':
      return {
        formData: action.payload,
        formDataLoading: null,
        formDataError: null
      };

    case 'SUBMIT_FORM_FAILURE':
      return {
        formData: {},
        formDataLoading: null,
        formDataError: true
      };

    default:
      return state.formData
  }
};

export default updateFormData;