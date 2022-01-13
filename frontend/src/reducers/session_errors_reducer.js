// import { HIDE_MODAL, DISPLAY_MODAL } from "../actions/modal_actions";
import { RECEIVE_SESSION_ERRORS, RECEIVE_CURRENT_USER, CLEAR_SESSION_ERRORS } from "../actions/session_actions";

const _nullErrors = []

const sessionErrorsReducer = (state=_nullErrors, action) => {
  Object.freeze(state)
  switch (action.type) {
    case RECEIVE_SESSION_ERRORS:
      return action.errors
    case RECEIVE_CURRENT_USER:
      return _nullErrors
    // case CLEAR_SESSION_ERRORS:
    //   return _nullErrors
    // case DISPLAY_MODAL:
    //   return _nullErrors
    // case HIDE_MODAL:
    //   return _nullErrors
    default:
      return state
  }
}

export default sessionErrorsReducer