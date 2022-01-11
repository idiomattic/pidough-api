import * as SessionApiUtil from '../util/session_api_util'

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER'
export const SIGNOUT_CURRENT_USER = 'SIGNOUT_CURRENT_USER'
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS'
export const CLEAR_SESSION_ERRORS = 'CLEAR_SESSION_ERRORS' 

const receiveCurrentUser = user => ({
  type: RECEIVE_CURRENT_USER,
  user
})


const signoutCurrentUser = () => ({
  type: SIGNOUT_CURRENT_USER
})

const receiveSessionErrors = errors => ({
  type: RECEIVE_SESSION_ERRORS,
  errors
})

const clearSessionErrors = () => ({
  type: CLEAR_SESSION_ERRORS
})

export const signIn = user => dispatch => (
  SessionApiUtil.signIn(user)
    .then(user => dispatch(receiveCurrentUser(user)),
      errors => dispatch(receiveSessionErrors(errors.responseJSON)))
)

export const signUp = user => dispatch => (
  SessionApiUtil.signUp(user)
    .then(user => dispatch(receiveCurrentUser(user)),
      error => dispatch(receiveSessionErrors(error.responseJSON)))
)

export const signOut = () => dispatch => (
  SessionApiUtil.signOut()
    .then(() => dispatch(signoutCurrentUser()),
      error => dispatch(receiveSessionErrors(error.responseJSON)))
)

export const clearErrors = () => dispatch => (
  dispatch(clearSessionErrors())
)