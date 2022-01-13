import { SIGNOUT_CURRENT_USER } from "../actions/session_actions";
// RECEIVE_CURRENT_USER, 

const initialState = {
  isAuthenticated: false,
  user: {}
}

function sessionReducer (state = initialState, action) {
  switch (action.type) {
    // case RECEIVE_CURRENT_USER:
    //   return {
    //     ...state,
    //     isAuthenticated: !!action.currentUser,
    //     user: action.currentUser
    //   };
    case SIGNOUT_CURRENT_USER:
      return {
        isAuthenticated: false,
        user: undefined
      };
    default:
      return state;
  }
}

export default sessionReducer