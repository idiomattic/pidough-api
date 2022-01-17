import React from "react";
// import DropdownModalContainer from "../dropdown_modal/dropdown_modal_container";
import SignInFormContainer from "../session/signin_form_container";
import SignUpFormContainer from '../session/signup_form_container'
// import CommentsModalContainer from "../comments_modal/comments_modal_container";

function Modal({modal, hideModal}) {
  if (!modal) {
    return null;
  }
  let component
  let backgroundClass
  let childClass
  switch (modal) {
    case 'Sign In':
      component = <SignInFormContainer />
      backgroundClass = 'modal-background'
      childClass = 'modal-child'
      break
    case 'Sign Up':
      component = <SignUpFormContainer />
      backgroundClass = 'modal-background'
      childClass = 'modal-child'
      break
    // case 'Dropdown':
    //   component = <DropdownModalContainer />
    //   backgroundClass = 'dropdown modal-background'
    //   childClass = 'dropdown modal-child'
    //   break
    // case 'Comments':
    //   component = <CommentsModalContainer />
    //   backgroundClass = 'comments modal-background'
    //   childClass = 'comments modal-child'
    //   break
    default:
      return null;
  }
  return (
    <div className='modal-background fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50' onClick={hideModal}>
      <div className='modal-container max-w-xl p-6 bg-white divide-y divide-gray-500 border-2 border-yellow-900 rounded-sm' onClick={e => e.stopPropagation()}>
        { component }
      </div>
    </div>
  );
}

export default Modal