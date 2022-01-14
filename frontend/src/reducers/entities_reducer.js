import { combineReducers } from "redux";
import UsersReducer from "./users_reducer";
import recipesReducer from "./recipes_reducer";
// import CommentsReducer from './comments_reducer'
// import FollowsReducer from "./follows_reducer";
// import LikesReducer from "./likes_reducer";

export default combineReducers({
  users: UsersReducer,
  recipes: recipesReducer,
  // comments: CommentsReducer,
  // follows: FollowsReducer,
  // likes: LikesReducer
})