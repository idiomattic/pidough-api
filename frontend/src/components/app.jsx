import React from 'react'
import { Switch, Route } from 'react-router-dom'
import HeaderContainer from '../components/header/header_container'
import Modal from '../components/modal/modal_container'
import '../index.css'

const App = () => {
  return(
  <div id='app' className='h-screen bg-yellow-700 bg-opacity-40'>
    <HeaderContainer />
    {/* <Switch> */}
      {/* <Route exact path='/' component={HeaderContainer}/>
      <Route exact path='/recipes/new' component={null}/>
      <Route exact path='/recipes/:recipeId' component={HeaderContainer}/> */}
    {/* </Switch> */}
    <div className='relative pb-10'>
      <Switch>
        {/* <Route exact path='/' component={RecipesIndexContainer}/>
        <ProtectedRoute exact path='/recipes/new' component={RecipeFormContainer}/>
        <ProtectedRoute exact path='/recipes/:recipeId' component={RecipeShowContainer}/>
        <ProtectedRoute exact path='/users/:userId' component={UserShowContainer}/> */}
      </Switch>
    </div>
    <footer className='bg-yellow-900 opacity-90 absolute bottom-0 h-20 w-screen'>
      <div className='flex justify-between max-w-6xl mx-auto px-4'>
        <div className='flex-shrink-0 w-64 mx-auto text-center '>
          <h3 className='text-white text-opacity-70 italic font-light mt-3'>More from Matthew Lese</h3>
          <div className='inline-flex mx-auto mt-2'>
            <a href="https://github.com/matthewlese" className='mr-3'>
              <div className='text-white text-opacity-70 font-light'>GitHub</div>
            </a>
            <a href="https://www.linkedin.com/in/matthewlese/" className='linkedin-link'>
              <div className='text-white text-opacity-70 font-light'>LinkedIn</div>
            </a>
          </div>
        </div>
      </div>
    </footer>
    <Modal />
  </div>
  )
}

export default App