import {
  RECEIVE_ALL_RECIPES,
  RECEIVE_RECIPE,
  REMOVE_RECIPE
} from "../actions/recipe_actions";

const recipesReducer = (state = {}, action) => {
  Object.freeze(state);
  const nextState = Object.assign({}, state);

  switch (action.type) {
    case RECEIVE_RECIPE:
      nextState[action.recipe._id] = action.recipe;
      return nextState;
    case RECEIVE_ALL_RECIPES:
      return action.recipes;
    case REMOVE_RECIPE:
      delete nextState[action.recipeId]
      return nextState;
    default:
      return state;
  }
};

export default recipesReducer;