const express = require('express');
const router = express.Router();
const testimonyController = require('../controllers/testimonyController');



router.post('/', testimonyController.uploadTestimony);

router.put('/:id',testimonyController.editById);

module.exports = router;
