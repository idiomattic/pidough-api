import { connect } from "react-redux";
import RecipesIndex from "./recipes_index";
import { getAllRecipes } from "../../actions/recipe_actions";

const mSTP = state => ({
  currentUser: state.session.user,
  signedIn: state.session.isAuthenticated,
  recipes: Object.values(state.entities.recipes) || []
})

const mDTP = dispatch => ({
  getAllRecipes: () => dispatch(getAllRecipes())
})

export default connect(mSTP, mDTP)(RecipesIndex)