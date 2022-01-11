import { RECEIVE_CURRENT_USER, SIGNOUT_CURRENT_USER } from "../actions/session_actions";

const _nullUser = {
  id: null
}

const sessionReducer = (state=_nullUser, action) => {
  Object.freeze(state)
  let nextState = Object.assign({}, state)
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return Object.assign(nextState, { currentUserId: action.user.id}) 
    case SIGNOUT_CURRENT_USER:
      return _nullUser
    default:
      return state
  }
}

export default sessionReducer