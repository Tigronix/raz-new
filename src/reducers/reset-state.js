const updateResetState = (state, action) => {
  if(state === undefined) {
    return {
      link: null
    }
  }

  switch(action.type){
    case 'RESET_STATE':
      return {
        link: action.payload
      }

    default:
      return state.redirect
  }
};  

export default updateResetState;