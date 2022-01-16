import axios from 'axios'

export const showAllRecipes = async () => {
  const response = await axios.get('/api/recipes')
  return response.data;
}

export const showRecipe = async (recipeId) => {
  const response = await axios.get(`/api/recipes/${recipeId}`)
  return response.data;
}

export const createRecipe = async (recipe) => {
  const response = await axios.post("/api/recipes/create", recipe);
  return response.data;
};

export const deleteRecipe = async (recipeId) => {
  const response = await axios.delete(`/api/recipes/${recipeId}/delete`)
  return response.data
}