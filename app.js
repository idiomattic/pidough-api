const express = require("express");
const port = process.env.PORT || 5000;
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');

const users = require('./routes/api/users')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.headers.host === 'teacher-pet.herokuapp.com') {
      return res.redirect(301, 'https://www.teacherspet.io');
    }
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect('https://' + req.headers.host + req.url);
    } else {
      return next();
    }
  })
  app.use(express.static('frontend/build'));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  })
}

app.get("/", (req, res) => res.send("Hello World 2"));
app.use("/api/users", users);
app.use(passport.initialize());
require('./config/passport')(passport);

const db = require('./config/keys').mongoURI;

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

app.listen(port, () => console.log(`Server is running on port ${port}`));