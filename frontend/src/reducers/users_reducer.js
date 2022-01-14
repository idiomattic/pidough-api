import { RECEIVE_CURRENT_USER, SIGNOUT_CURRENT_USER } from "../actions/session_actions"
import { RECEIVE_USER } from '../actions/user_actions'
// import { RECEIVE_RECIPES } from '../actions/recipe_actions'
// import { RECEIVE_FOLLOW, REMOVE_FOLLOW } from "../actions/follow_actions"

let currentUserId = null

const usersReducer = (state={}, action) => {
  Object.freeze(state)
  let nextState = Object.assign({}, state)
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      currentUserId = action.currentUser.id
      return Object.assign(nextState, { [currentUserId]: action.currentUser})
    case SIGNOUT_CURRENT_USER:
      delete nextState[currentUserId]
      currentUserId = null
      return nextState
    case RECEIVE_USER:
      return Object.assign(nextState, { [action.currentUser.id]: action.currentUser})
    // case RECEIVE_USERS:
    //   return action.users
    // case RECEIVE_RECIPES:
    //   Object.values(action.recipes).forEach(recipe => {
    //     Object.assign(nextState, {[recipe.author.id]: recipe.author})
    //   })
    //   return nextState
    // case RECEIVE_FOLLOW:
    //   nextState['followers'][action.follow.follower_id] = action.follow.follower
    //   return nextState
    // case REMOVE_FOLLOW:
    //   delete nextState['followers'][action.follow.follower_id]
    //   return nextState
    default:
      return state
  }
}

export default usersReducer