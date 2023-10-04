const express = require('express');
const router = express.Router();
const order = require("../Controller/OrderController")

router.post('/add' , order.addOrder);

router.put("/edit/:id" , order.editOrder);

router.delete("/delete/:id", order.deleteOrder)


router.get('/getorder' , order.getOrder)

router.get('/getorder/:id' , order.getOrderById)



module.exports = router