const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const keys = require('../../config/keys');
const jwt = require('jsonwebtoken'); 
const passport = require('passport');

const Recipe = require("../../models/Recipe");
const validateRecipeInput = require('../../validations/recipe');

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

router.get('/', (req, res) => {
  Recipe.find()
    .then(recipes => res.json(recipes))
    .catch(err => res.status(404).json({ noRecipesFound: 'No recipes found.'}))
})

router.get('/:recipeId', (req, res) => {
  const { recipeId } = req.params
  Recipe.findById(recipeId)
    .then(recipe => res.json(recipe))
    .catch(err => res.status(404).json({ noRecipeFound: 'No recipe found.'}))
  })
  
  router.delete('/:recipeId/delete', (req, res) => {
    const { recipeId } = req.params
    Recipe.findByIdAndDelete(recipeId)
    .catch(err => res.status(404).json({ noRecipeFound: 'No recipe found.'}))
})

module.exports = router