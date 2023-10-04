const express = require('express');
const router = express.Router();
const positionsDetails = require("../Controller/PositionsController")

router.post('/add' , positionsDetails.addpositions);

router.put("/edit/:id" , positionsDetails.editpositions);

router.delete("/delete/:id", positionsDetails.deletepositions)

router.get("/getpositions", positionsDetails.getpositions)

router.get("/getpositions/:id", positionsDetails.getpositionsById)



module.exports = router