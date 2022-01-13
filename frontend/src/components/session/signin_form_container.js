import React from "react";
import { connect } from "react-redux";
import SessionForm from "./session_form";
import { signin } from "../../actions/session_actions";
import { hideModal, displayModal } from "../../actions/modal_actions";

const mSTP = ({ errors }) => ({
  formType: 'Sign In',
  errors: errors.session
})

const mDTP = dispatch => ({
  action: user => dispatch(signin(user)),
  hideModal: () => dispatch(hideModal()),
  // clearErrors: () => dispatch(clearErrors()),
  otherForm: (
    <div className=''>
      No account?
      <p onClick={() => dispatch(displayModal('Sign Up'))}
        className='inline cursor-pointer font-medium text-gray-800 hover:text-black hover:italic'
        > Create One</p>
    </div>
  )
})

export default connect(mSTP, mDTP)(SessionForm)