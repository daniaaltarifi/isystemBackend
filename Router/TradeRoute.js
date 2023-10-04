const express = require('express');
const router = express.Router();
const TradeDetails = require("../Controller/TradeController")

router.post('/add' , TradeDetails.addTrade);

router.put("/edit/:id" , TradeDetails.editTrade);

router.delete("/delete/:id", TradeDetails.deleteTrade)

router.get("/gettrades", TradeDetails.getTrade)

router.get("/gettrade/:id", TradeDetails.getTradeById)



module.exports = router