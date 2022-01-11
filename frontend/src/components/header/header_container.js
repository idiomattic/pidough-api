import { connect } from "react-redux";
import Header from "./header";
import { displayModal } from "../../actions/modal_actions";

const mSTP = state => ({
  currentUserId: state.session.currentUserId
})

const mDTP = dispatch => ({
  displayModal: modal => dispatch(displayModal(modal))
})

export default connect(mSTP, mDTP)(Header)