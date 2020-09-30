const router = require('express').Router()
const {uploadNews} = require('../controllers/newsController')
const requireLogin = require('../middlewares/requirelogin')

//Todo: Cambiar esta linea para usarlo con usuarios registrados y testear el funcionamiento
// router.post('/news',requireLogin, uploadNews)
router.post('/news', uploadNews)


module.exports = router