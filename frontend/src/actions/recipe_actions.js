import * as RecipeAPIUtil from '../util/recipe_api_util'

export const RECEIVE_ALL_RECIPES = 'RECEIVE_ALL_RECIPES'
export const RECEIVE_RECIPE = 'RECEIVE_RECIPE'
export const RECEIVE_RECIPE_ERRORS = 'RECEIVE_RECIPE_ERRORS'
export const REMOVE_RECIPE = 'REMOVE_RECIPE'

export const receiveAllRecipes = recipes => ({
  type: RECEIVE_ALL_RECIPES,
  recipes
})

export const receiveRecipe = recipe => ({
  type: RECEIVE_RECIPE,
  recipe
})

export const receiveErrors = errors => ({
  type: RECEIVE_RECIPE_ERRORS,
  errors
})

export const removeRecipe = recipeId => ({
  type: REMOVE_RECIPE,
  recipeId
})

export const getRecipe = recipeId => dispatch =>
  RecipeAPIUtil.showRecipe(recipeId)
    .then(recipe => dispatch(receiveRecipe(recipe)))
    .catch(err => dispatch(receiveErrors(err)))

export const getAllRecipes = () => dispatch =>
  RecipeAPIUtil.showAllRecipes()
    .then(recipes => dispatch(receiveAllRecipes(recipes)))
    .catch(err => dispatch(receiveErrors(err)))
    
export const createRecipe = recipe => dispatch =>
  RecipeAPIUtil.createRecipe(recipe)
    .then(recipe => dispatch(receiveRecipe(recipe)))
    .catch(err => dispatch(receiveErrors(err)))

export const deleteRecipe = recipeId => dispatch =>
  RecipeAPIUtil.deleteRecipe(recipeId)
    .then(() => dispatch(removeRecipe(recipeId)))
    .catch(err => dispatch(receiveErrors(err)))