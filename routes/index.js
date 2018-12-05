const express = require('express');


const router = express.Router();

/* GET home page. */
router.use('/', (req, res) => {
  res.render('index', { title: 'Devs in Berkshire' });
});


module.exports = router;
