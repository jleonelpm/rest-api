const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send("We are on categories");
});

router.get('/detail', (req, res) => {
    res.send("We are on category Detail");
});


module.exports = router;