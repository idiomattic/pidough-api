import React from "react"
import { useHistory } from "react-router"
import bootstrap from 'bootstrap'

const Header = props => {
  const history = useHistory()

  let { currentUserId, displayModal } = props
  let rightNav

  if (!currentUserId) {
    rightNav = <div className='flex items-center space-x-3'>
      <a href="" className='font-medium text-gray-800 hover:text-black hover:font-extrabold hover:italic' onClick={() => displayModal('Sign In')}>Sign In</a>
      <a href="" className='font-medium text-gray-800 hover:text-black hover:font-extrabold hover:italic' onClick={() => displayModal('Sign Up')}>Get Started</a>
    </div>
  } else {
    rightNav = <div className='flex items-center space-x-3'>
      <a href="">User</a>
    </div>
  }
  
  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-white'>
      <div className="container-fluid">
        <a className='navbar-brand' href='#'>PizzaPi</a>
        <div className='flex align-middle'>
          {rightNav}
        </div>
      </div>
    </nav>
  )
}

export default Header