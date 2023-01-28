const express = require("express");
const port = process.env.PORT || 8000;
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./src/routes/users')
const recipes = require('./src/routes/recipes')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/users", users);
app.use('/api/recipes', recipes)

app.use(passport.initialize());
require('./config/passport')(passport);

const db = require('./config/keys').mongoURI;

mongoose
  .set('strictQuery', true)
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

app.listen(port, () => console.log(`Server is running on port ${port}`));