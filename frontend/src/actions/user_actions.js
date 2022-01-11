import * as UserApiUtil from '../util/user_api_util'

export const RECEIVE_USERS = 'RECEIVE_USERS'
export const RECEIVE_USER = 'RECEIVE_USER'
export const REMOVE_USER = 'REMOVE_USER'
export const RECEIVE_USER_ERRORS = 'RECEIVE_USER_ERRORS'
export const CLEAR_USER_ERRORS = 'CLEAR_USER_ERRORS'

// const receiveUsers = users => ({
//   type: RECEIVE_USERS,
//   users
// })

const receiveUser = user => ({
  type: RECEIVE_USER,
  user
})

const removeUser = userId => ({
  type: REMOVE_USER,
  userId
})

const receiveUserErrors = errors => ({
  type: RECEIVE_USER_ERRORS,
  errors
})

const clearUserErrors = () => ({
  type: CLEAR_USER_ERRORS
})

// export const fetchUsers = () => dispatch => (
//   UserApiUtil.fetchUsers()
//     .then(users => dispatch(receiveUsers(users)),
//       errors => dispatch(receiveUserErrors(errors.responseJSON)))
// )

export const fetchUser = userId => dispatch => (
  UserApiUtil.fetchUser(userId)
    .then(user => dispatch(receiveUser(user)),
      errors => dispatch(receiveUserErrors(errors.responseJSON)))
)

export const updateUser = (user, userId) => dispatch => (
  UserApiUtil.updateUser(user, userId)
    .then(user => dispatch(receiveUser(user)),
      errors => dispatch(receiveUserErrors(errors.responseJSON)))
)

export const deleteUser = userId => dispatch => (
  UserApiUtil.deleteUser(userId)
    .then(() => dispatch(removeUser(userId)),
      errors => dispatch(receiveUserErrors(errors.responseJSON)))
)

export const clearErrors = () => dispatch => (
  dispatch(clearUserErrors())
)