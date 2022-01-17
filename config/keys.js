// module.exports = {
//   mongoURI: 'mongodb+srv://matthewlese:7Qz4eQNPjaHb@cluster0.hi8ss.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
//   secretOrKey: 'secret'
// }
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./keys_prod');
} else {
  module.exports = require('./keys_dev');
}