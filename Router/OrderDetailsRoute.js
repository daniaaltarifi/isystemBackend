const express = require('express');
const router = express.Router();
const orderDetails = require("../Controller/OrderDetailsController")

router.post('/add' , orderDetails.addOrder);

router.put("/edit/:id" , orderDetails.editOrder);

router.delete("/delete/:id", orderDetails.deleteOrder)

router.get('/getorder' , orderDetails.getOrder)

router.get('/getorder/:id' , orderDetails.getOrderById)


module.exports = router