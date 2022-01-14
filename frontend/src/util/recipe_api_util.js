import axios from 'axios'

export const showRecipe = async (recipeId) => {
  const response = await axios.get(`/api/recipes${recipeId}`)
}