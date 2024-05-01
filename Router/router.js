const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
  res.send(`<h1>Hello World!</h1>`);
});

module.exports=router