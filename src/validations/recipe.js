const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateRecipeInput(data) {
  let errors = {};

  data.title = validText(data.title) ? data.title : '';
  data.body = validText(data.body) ? data.body : '';
  data.authorName = validText(data.authorName) ? data.authorName : '';
  data.originalProportion = validText(data.originalProportion) ? data.originalProportion : '';

  if (Validator.isEmpty(data.title)) {
    errors.title = 'Title field is required';
  }

  if (Validator.isEmpty(data.authorId)) {
    errors.authorId = 'Something went wrong with the author id'
  }

  if (Validator.isEmpty(data.authorName)) {
    errors.authorName = 'Something went wrong with the authorName'
  }

  if (Object.keys(data.data).length === 0) {
    errors.data = 'Recipe data cannot be empty'
  }
  
  if (Validator.isEmpty(data.body)) {
    errors.body = 'Body is required'
  }
  
  if (Validator.isEmpty(data.originalProportion)) {
    errors.originalProportion = 'Something went wrong with the original proportion'
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};