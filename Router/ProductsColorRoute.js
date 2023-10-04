const express = require('express');
const router = express.Router();
const products = require("../Controller/ProductColorsController")
const multer = require('multer');
const dataProducts = require("../Module/allData");
const storage = multer.memoryStorage();
const upload = multer({ storage });
const sharp = require('sharp');
const path = require('path');


const uploadMultiple = upload.array('image_color', 10); // 10 is the maximum number of files allowed

router.post('/add',uploadMultiple,

async (req, res) => {
    const { color_name, product_id } = req.body;
    const uploadDirectory = path.join(__dirname, '..', 'imagesists');
    const imagePaths = [];
  
    for (const file of req.files) {
      const fileName = file.originalname;
      const filePath = path.join(uploadDirectory, fileName);
  
      try {
        // Resize the image before saving
        await sharp(file.buffer)
            .resize({ width: 80, height:80 }) // Set the desired width
            .toFile(filePath);

        console.log("Image saved successfully:", filePath);

        const imagePath = `imagesists/${fileName}`;
        imagePaths.push(imagePath);
      } catch (error) {
        console.error("Error saving an image:", error);
        return res.status(500).json({ error: "Image upload failed" });
      }
    }
  
    // Insert image paths into the database one by one
    const query = "INSERT INTO color (color_name, image_color, product_id) VALUES (?, ?, ?)";
  
    try {
      for (const imagePath of imagePaths) {
        await dataProducts.query(query, [color_name, imagePath, product_id]);
      }
  
      res.status(200).json({ message: "Images uploaded and saved successfully" });
    } catch (error) {
      console.error("Error inserting image paths into the database:", error);
      return res.status(500).json({ error: "Image upload and database update failed" });
    }
  }


)



router.put('/edit/:id',uploadMultiple, async (req, res) => {
    const itemId = req.params.id;
    const { color_name, product_id } = req.body;
    const uploadDirectory = path.join(__dirname, '..', 'imagesists');
    const imagePaths = [];
  
    for (const file of req.files) {
      const fileName = file.originalname;
      const filePath = path.join(uploadDirectory, fileName);
  
      try {
        // Resize the image before saving
        await sharp(file.buffer)
          .resize({ width: 800, height: 800 }) // Set the desired width
          .toFile(filePath);
  
        console.log("Image saved successfully:", filePath);
  
        const imagePath = `imagesists/${fileName}`;
        imagePaths.push(imagePath);
      } catch (error) {
        console.error("Error saving an image:", error);
        return res.status(500).json({ error: "Image upload failed" });
      }
    }
  
    // Update color data and image path in the database
    const query = "UPDATE color SET color_name = ?, image_color = ?, product_id = ? WHERE color_id = ?";
  
    try {
      for (const imagePath of imagePaths) {
        await dataProducts.query(query, [color_name, imagePath, product_id, itemId]);
      }
  
      res.status(200).json({ message: "Color updated successfully" });
    } catch (error) {
      console.error("Error updating color:", error);
      return res.status(500).json({ error: "Color update failed" });
    }
  } );


router.delete('/delete/:id', products.deleteColor);

router.get('/getproductdetails' , products.getProductclors)

router.get('/getproductdetails/:id' , products.getProductclorsByProduct_id)


module.exports = router
