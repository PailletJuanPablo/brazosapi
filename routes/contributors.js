let express = require('express');
let router = express.Router();
const contributorsController = require('../controllers/contributorsController');

router.get('/', contributorsController.getAll);

router.post('/', contributorsController.add);

module.exports = router;
