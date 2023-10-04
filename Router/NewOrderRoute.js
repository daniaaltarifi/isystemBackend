const express = require('express');
const router = express.Router();
const products = require("../Controller/NewOrderController")

router.post('/add',products.addOrder );


router.put('/edit/:id', products.editOrder );


router.delete('/delete/:id', products.deleteOrder );

router.get('/getorder' , products.getOrder)

router.get('/getorder/:id' , products.getOrderById)

// // router.get('/getproductsiphone' , products.getProductIphone)

module.exports = router