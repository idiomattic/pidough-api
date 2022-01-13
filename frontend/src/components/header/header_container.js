import { connect } from "react-redux";
import Header from "./header";
import { displayModal } from "../../actions/modal_actions";
import { signout } from '../../actions/session_actions'

const mSTP = state => ({
  signedIn: state.session.isAuthenticated || state.session.isSignedIn,
  currentUser: state.session.user
})

const mDTP = dispatch => ({
  displayModal: modal => dispatch(displayModal(modal)),
  signout: () => dispatch(signout())
})

export default connect(mSTP, mDTP)(Header)