const express = require('express');
const { productsCtrlFunction } = require('../controllers/productsCtrlFile');

const router = express.Router();

router.get('/', productsCtrlFunction ); 



module.exports = router;