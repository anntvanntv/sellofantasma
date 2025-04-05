const express = require('express');
const { homeCtrlFunction, cartCtrlFunction, coverCtrlFunction, gruposCtrlFunction, silsepCtrlFunction, elsaCtrlFunction, newsCtrlFunction, aboutCtrlFunction, termsCtrlFunction } = require('../controllers/pagesCtrlFile');

const router = express.Router();

router.get('/index', coverCtrlFunction); 
router.get('/cart', cartCtrlFunction);
router.get('/grupos', gruposCtrlFunction);
router.get('/silenciosepulcral', silsepCtrlFunction);
router.get('/elsa', elsaCtrlFunction);
router.get('/news', newsCtrlFunction);
router.get('/about', aboutCtrlFunction);
router.get('/termsconditions', termsCtrlFunction);

router.get('/', homeCtrlFunction);


module.exports = router;