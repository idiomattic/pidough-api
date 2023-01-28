const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const keys = require('../../config/keys');
const jwt = require('jsonwebtoken'); 
const passport = require('passport');
const _ = require('lodash');

const Recipe = require("../models/Recipe");
const validateRecipeInput = require('../validations/recipe');

router.post('/create', passport.authenticate('jwt', { session: false }), 
  (req, res) => {
    const { errors, isValid } = validateRecipeInput(req.body)

    if (!isValid) {
      return res.status(400).json(errors);
    }
    let { title, authorId } = req.body
    Recipe.findOne({
      authorId: authorId, // filter by the author (current user)
      title: title        // filter by title
    }).then(recipe => {
      if (recipe) {
        errors.title = 'You already have a recipe with this title.'
        return res.status(400).json(errors) // bad request
      } else {
        const newRecipe = new Recipe(req.body)
        newRecipe.save()
          .then(recipe => res.json(recipe))
          .catch(err => res.status(400).json(err));
      }
    })
})

router.get('/', async (req, res) => {
  const recipes = await Recipe.find();
  console.log(recipes)

  if (_.isEmpty(recipes)) {
    return res.status(404).json({ noRecipesFound: 'No recipes found.'})
  };

  return res.json(recipes);
})

router.get('/:recipeId', async (req, res) => {
  const { recipeId } = req.params
  const recipe = await Recipe.findById(recipeId);
  console.log(recipe)
  
  if (!recipe) {
    return res.status(404).json({ noRecipeFound: 'No recipe found.'})
  }

  return res.json(recipe);
})
  
  router.delete('/:recipeId/delete', (req, res) => {
    const { recipeId } = req.params
    Recipe.findByIdAndDelete(recipeId)
      .then(_recipe => res.json('successfully deleted'))
      .catch(err => res.status(404).json({ noRecipeFound: 'No recipe found.', err}))
})

module.exports = router