const express = require('express');
const router = express.Router();
const subscribeDetails = require("../Controller/SubscribeController")

router.post('/add' , subscribeDetails.addSubscribe);

router.put("/edit/:id" , subscribeDetails.editSubscribe);

router.delete("/delete/:id", subscribeDetails.deleteSubscribe)

router.get("/getsubscribes", subscribeDetails.getSubscribe)

router.get("/getsubscribe/:id", subscribeDetails.getSubscribeById)



module.exports = router