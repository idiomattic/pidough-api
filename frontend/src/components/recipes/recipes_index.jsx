import React, {useEffect, useState} from 'react'
import RecipesIndexItem from './recipes_index_item'

function RecipesIndex(props) {
  useEffect(() => props.getAllRecipes(), [])

  return (
    <div className='mt-7 w-full'>
      <ul className='flex flex-wrap justify-center -mt-4 w-full mx-auto px-2'>
        {props.recipes.map((recipe, i) => (
          <RecipesIndexItem key={i} recipe={recipe}/>
        ))}
      </ul>
    </div>
  )
}

export default RecipesIndex
