const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const keys = require('../../config/keys');
const jwt = require('jsonwebtoken'); 
const passport = require('passport');
const validateSignupInput = require('../../validations/signup');
const validateSigninInput = require('../../validations/signin');

router.post('/create', (req, res) => {
  const { errors, isValid } = validateRecipeInput(req.body)
})