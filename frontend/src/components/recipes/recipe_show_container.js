import { connect } from "react-redux";
import RecipeShow from "./recipe_show";
import { getRecipe } from "../../actions/recipe_actions";
// import { displayModal } from "../../actions/modal_actions";

const mSTP = (state, {match}) => {
  const recipeId = parseInt(match.params.recipeId)
  let recipe = state.entities.recipes[recipeId]
  return({
    signedIn: state.session.isAuthenticated || state.session.isSignedIn,
    currentUser: state.session.user,
    recipe,
    recipeId
  })
}

const mDTP = dispatch => ({
  // displayModal: () => dispatch(displayModal('Comments')),
  getRecipe: recipeId => dispatch(getRecipe(recipeId)),
  // deleteRecipe: recipeId => dispatch(deleteRecipe(recipeId)),
})

export default connect(mSTP, mDTP)(RecipeShow)