const express = require('express');
const { cartSuccessFunction, checkoutCtrlFunction, finishOrder } = require('../controllers/checkoutCtrlFile');

const router = express.Router();

router.post('/', checkoutCtrlFunction);
router.get('/success', cartSuccessFunction);
router.get('/session/:id', finishOrder);




module.exports = router;