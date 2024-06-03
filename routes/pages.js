const express = require('express');
const { homeCtrlFunction, cartCtrlFunction } = require('../controllers/pagesCtrlFile');

const router = express.Router();

router.get('/', homeCtrlFunction); 
router.get('/cart', cartCtrlFunction); 


module.exports = router;