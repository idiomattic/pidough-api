import React from "react";
import { connect } from "react-redux";
import SessionForm from "./session_form";
import { signUp, clearErrors } from "../../actions/session_actions";
import { hideModal, displayModal } from "../../actions/modal_actions";
import { Link } from "react-router-dom";

const mSTP = ({ errors }) => ({
  formType: 'Sign Up',
  errors: errors.session
})

const mDTP = dispatch => ({
  action: user => dispatch(signUp(user)),
  hideModal: () => dispatch(hideModal()),
  clearErrors: () => dispatch(clearErrors()),
  otherForm: (
    <p className='other-form-prompt'>
      Already have an account?
      <Link to='/' onClick={() => dispatch(displayModal('Sign In'))} className='other-form-link'> Sign In</Link>
    </p>
  )
})

export default connect(mSTP, mDTP)(SessionForm)