import { connect } from "react-redux";
import Header from "./header";
import { displayModal } from "../../actions/modal_actions";

const mSTP = state => ({
  signedIn: state.session.isAuthenticated,
  currentUser: state.session.user
})

const mDTP = dispatch => ({
  displayModal: modal => dispatch(displayModal(modal))
})

export default connect(mSTP, mDTP)(Header)