const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  authorId: {
    type: Schema.Types.ObjectId, // foreign key
    ref: 'users'
  },
  authorName: {
    type: String,
    required: true
  },
  data: {
    type: Object,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  originalProportion: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

module.exports = Recipe = mongoose.model('Recipe', RecipeSchema);