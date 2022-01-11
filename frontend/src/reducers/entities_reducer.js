import { combineReducers } from "redux";
import UsersReducer from "./users_reducer";
// import RecipesReducer from "./recipes_reducer";
// import CommentsReducer from './comments_reducer'
// import FollowsReducer from "./follows_reducer";
// import LikesReducer from "./likes_reducer";

export default combineReducers({
  users: UsersReducer,
  // recipes: RecipesReducer,
  // comments: CommentsReducer,
  // follows: FollowsReducer,
  // likes: LikesReducer
})