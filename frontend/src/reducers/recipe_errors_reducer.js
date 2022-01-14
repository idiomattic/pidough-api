import { RECEIVE_RECIPE, RECEIVE_ALL_RECIPES, RECEIVE_RECIPE_ERRORS } from "../actions/recipe_actions";

const recipeErrorsReducer = (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_RECIPE_ERRORS:
      return action.errors;
    case RECEIVE_RECIPE:
      return [];
    case RECEIVE_ALL_RECIPES:
      return [];
    default:
      return state;
  }
};

export default recipeErrorsReducer;