const updateResetState = (state, action) => {
  if(state === undefined) {
    return {
      data: action.payload
    }
  }

  switch(action.type){
    case 'RESET_STATE':
      return {
        data: action.payload
      }

    default:
      return state.redirect
  }
};  

export default updateResetState;