const express = require('express');
const router = express.Router();
const products = require("../Controller/ProductsDetailsController")

router.post('/add',products.addProductDetails );


const multer = require('multer');
const dataProducts = require("../Module/allData");
const storage = multer.memoryStorage();
const upload = multer({ storage });

const fs = require('fs');
const path = require('path');

const uploadMultiple = (req, res, next) => {
   
   
    upload.array('image_path')(req, res, (err) => {
      if (err) {
        console.error('Error uploading images:', err);
        return res.status(500).json({ error: 'Image upload failed' });
      }
      next();
    });
  };


// Controller for editing product details and images
const editProduct = async (req, res) => {
   const product_id = req.params.product_id
    const {
      product_name,
      price,
      details,
      stock,
      category_id,
      old_price,
      screen,
      battery,
      camera_front,
      camera_back,
      material,
      gpu,
      cpu,
      type_charger,
      type_id,
    } = req.body;
  
    try {
      // Update product details in the products table
      await dataProducts.query(
        `
        UPDATE products
        SET
          product_name = ?,
          price = ?,
          details = ?,
          stock = ?,
          category_id = ?,
          old_price = ?,
          screen = ?,
          battery = ?,
          camera_front = ?,
          camera_back = ?,
          material = ?,
          gpu = ?,
          cpu = ?,
          type_charger = ?,
          type_id = ?
        WHERE p_id = ?
        `,
        [
          product_name,
          price,
          details,
          stock,
          category_id,
          old_price,
          screen,
          battery,
          camera_front,
          camera_back,
          material,
          gpu,
          cpu,
          type_charger,
          type_id,
          product_id,
        ]
      );
  
      // Handle image updates if files are attached to the request
      if (req.files && req.files.length > 0) {
        const uploadDirectory = path.join(__dirname, '..', 'imagesists');
        const imagePaths = [];
  
        for (const file of req.files) {
            const fileName = file.originalname;
            const filePath = path.join(uploadDirectory, fileName);
        
          await fs.promises.writeFile(filePath, file.buffer);
  
          console.log("Image saved successfully:", filePath);
  
          const imagePath = `imagesists/${fileName}`;
          imagePaths.push(imagePath);
        }
  
        // Update image paths in the product_images table for the product
        const deletePreviousImagesQuery = "DELETE FROM product_images WHERE product_id = ?";
        await dataProducts.query(deletePreviousImagesQuery, [product_id]);
  
        const insertNewImagesQuery = "INSERT INTO product_images (product_id, image_path) VALUES (?, ?)";
        for (const imagePath of imagePaths) {
          await dataProducts.query(insertNewImagesQuery, [product_id, imagePath]);
        }
      }
  
      res.status(200).json({ message: "Product details and images updated successfully" });
    } catch (error) {
      console.error("Error updating product details and images:", error);
      return res.status(500).json({ error: "Product update failed" });
    }
  };
  

// Define the route for editing a product
router.put('/edit/:product_id', uploadMultiple, editProduct);


router.delete('/delete/:id', products.deleteProductDetails );

router.get('/getproductdetails' , products.getProductDetails)

router.get('/getproductdetails/:id' , products.getProductDetailsById)

router.get('/getproductdetailsbycategory/:id' , products.getProductDetailsByCategory)

module.exports = router
