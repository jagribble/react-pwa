const express = require('express');
const path = require('path');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Devs in Berkshire' });
});


router.use((req, res, next) => {
  if (req.originalUrl.includes('/js/')) {
    next();
  }
  res.render('index', { title: 'Devs in Berkshire' });
});

module.exports = router;
