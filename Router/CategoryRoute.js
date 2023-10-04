const express = require('express');
const router = express.Router();
const categoryDetails = require("../Controller/CategoryController")

router.post('/add' , categoryDetails.addCategory);

router.put("/edit/:id" , categoryDetails.editCategory);

router.delete("/delete/:id", categoryDetails.deleteCategory)

router.get("/getproducts", categoryDetails.getCategory)

router.get("/getproducts/:id", categoryDetails.getCategoryById)



module.exports = router