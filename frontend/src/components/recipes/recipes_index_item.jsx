import React from 'react'
import { withRouter } from 'react-router'

function RecipesIndexItem(props) {
  let { recipe, history } = props
  let truncatedBody = recipe.body.split('. ')[0] + '...'
  return (
    <div className='px-4' onClick={() => history.push(`/recipes/${recipe._id}`)}>
      <div className='bg-white max-w-sm px-4 border-2 border-yellow-900 rounded-md'>
        <h2 className='mt-2 text-xl font-bold'>{recipe.title}</h2>
        <p className='w-full'>{truncatedBody}</p>
      </div>
    </div>
  )
}

export default withRouter(RecipesIndexItem)
