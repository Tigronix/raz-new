const updateFormData = (state, action) => {
  if (state === undefined) {
    return {
      formData: [],
      loading: null,
      error: null
    }
  }

  switch (action.type) {
    case 'SUBMIT_FORM_REQUEST':
      return {
        formData: {},
        loading: true,
        error: null
      };

    case 'SUBMIT_FORM_SUCCESS':
      return {
        formData: action.payload,
        loading: null,
        error: null
      };

    case 'SUBMIT_FORM_FAILURE':
      return {
        formData: {},
        loading: null,
        error: true
      };

    default:
      return state.formData
  }
};

export default updateFormData;