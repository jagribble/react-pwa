const express = require('express');
const path = require('path');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Devs in Berkshire' });
});

router.get('/js/build.js', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/js/build.js'));
});

router.use((req, res) => {
  res.render('index', { title: 'Devs in Berkshire' });
});

module.exports = router;
