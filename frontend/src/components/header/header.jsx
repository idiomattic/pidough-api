import React from "react"
import { useHistory } from "react-router"

const Header = props => {
  const history = useHistory()

  let { currentUserId, displayModal } = props
  let rightNav

  if (!currentUserId) {
    rightNav = <div className='flex items-center space-x-3'>
      <div className='font-medium text-gray-800 hover:text-black hover:italic' onClick={e => displayModal('Sign In')}>Sign In</div>
      <div className='font-medium text-gray-800 hover:text-black hover:italic' onClick={e => displayModal('Sign Up')}>Get Started</div>
    </div>
  } else {
    rightNav = <div className='flex items-center space-x-3'>
      <div>User</div>
    </div>
  }
  return (
    <nav className='bg-white border-b-2 border-yellow-900 border-opacity-90'>
      <div className='max-w-6xl mx-auto px-4'>
        <header className='flex justify-between h-10 mt-7 mb-4'>
          <h2 className='font-bold text-3xl' onClick={() => history.push({pathname: '/'})}>PizzaPi</h2>
          <div className='flex align-middle'>
            {rightNav}
          </div>
        </header> 
      </div>
    </nav>
  )
}

export default Header