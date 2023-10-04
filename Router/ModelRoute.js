const express = require('express');
const router = express.Router();
const modelDetails = require("../Controller/ModelController")

router.post('/add' , modelDetails.addmodel);

router.put("/edit/:id" , modelDetails.editmodel);

router.delete("/delete/:id", modelDetails.deletemodel)

router.get("/getproducts", modelDetails.getmodel)

router.get("/getproducts/:id", modelDetails.getmodelById)



module.exports = router