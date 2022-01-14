import { connect } from "react-redux";
import RecipeForm from "./recipe_form";
import { createRecipe } from "../../actions/recipe_actions";

const mSTP = state => {
  const author = state.session.user
  const currentUserId = author.id
  return ({
    author,
    currentUserId,
    formType: 'Create Recipe',
    errors: state.errors.recipe
  })
}

const mDTP = dispatch => ({
  action: recipe => dispatch(createRecipe(recipe)),
  // clearErrors: () => dispatch(clearErrors())
})

export default connect(mSTP, mDTP)(RecipeForm)