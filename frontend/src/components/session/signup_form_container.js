import React from "react";
import { connect } from "react-redux";
import SessionForm from "./session_form";
import { signup } from "../../actions/session_actions";
import { hideModal, displayModal } from "../../actions/modal_actions";

const mSTP = ({ errors }) => ({
  formType: 'Sign Up',
  errors: errors.session
})

const mDTP = dispatch => ({
  action: user => dispatch(signup(user)),
  hideModal: () => dispatch(hideModal()),
  // clearErrors: () => dispatch(clearErrors()),
  otherForm: (
    <div className='other-form-prompt'>
      Already have an account?
      <p onClick={() => dispatch(displayModal('Sign In'))} 
        className='inline cursor-pointer font-medium text-gray-800 hover:text-black hover:italic'
        > Sign In</p>
    </div>
  )
})

export default connect(mSTP, mDTP)(SessionForm)