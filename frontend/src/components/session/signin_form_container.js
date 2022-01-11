import React from "react";
import { connect } from "react-redux";
import SessionForm from "./session_form";
import { signIn, clearErrors } from "../../actions/session_actions";
import { hideModal, displayModal } from "../../actions/modal_actions";
import { Link } from "react-router-dom";

const mSTP = ({ errors }) => ({
  formType: 'Sign In',
  errors: errors.session
})

const mDTP = dispatch => ({
  action: user => dispatch(signIn(user)),
  hideModal: () => dispatch(hideModal()),
  clearErrors: () => dispatch(clearErrors()),
  otherForm: (
    <p className='other-form-prompt'>
      No account?
      <Link to='/' onClick={() => dispatch(displayModal('Sign Up'))} className='other-form-link'> Create One</Link>
    </p>
  )
})

export default connect(mSTP, mDTP)(SessionForm)