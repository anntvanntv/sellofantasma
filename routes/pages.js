const express = require('express');
const { homeCtrlFunction, cartCtrlFunction, coverCtrlFunction, gruposCtrlFunction, silsepCtrlFunction, elsaCtrlFunction, newsCtrlFunction, termsCtrlFunction, evriCtrlFunction, impeCtrlFuncion } = require('../controllers/pagesCtrlFile');

const router = express.Router();

router.get('/index', coverCtrlFunction); 
router.get('/cart', cartCtrlFunction);
router.get('/grupos', gruposCtrlFunction);
router.get('/silenciosepulcral', silsepCtrlFunction);
router.get('/elsa', elsaCtrlFunction);
router.get('/evripidisandhistragedies', evriCtrlFunction);
router.get('/imperio', impeCtrlFuncion);
router.get('/news', newsCtrlFunction);
router.get('/termsconditions', termsCtrlFunction);

router.get('/', homeCtrlFunction);


module.exports = router;