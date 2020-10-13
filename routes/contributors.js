let express = require('express');
let router = express.Router();

const contributors = require('../controllers/contributorsController');

router.post('/', contributors.add);

module.exports = router;
