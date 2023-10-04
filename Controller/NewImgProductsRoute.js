// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const dataProducts = require("../Module/allData.js"); // Import your database connection
// const storage = multer.memoryStorage(); // Store the image in memory
// const upload = multer({ storage });

// const fs = require('fs');
// const path = require('path');


// const uploadMultiple = (req, res, next) => {
   
   
//     upload.array('image')(req, res, (err) => {
//       if (err) {
//         console.error('Error uploading images:', err);
//         return res.status(500).json({ error: 'Image upload failed' });
//       }
//       next();
//     });
//   };


//   const addProduct = async (req, res) => {
//     const uploadDirectory = ' C:\Users\dania\Desktop\iSystemMain\imagesIsys';
//     const imagePaths = [];
  
//     for (const file of req.files) {
//       const fileName = file.originalname;
//       const filePath = path.join(uploadDirectory, fileName);
  
//       try {
//         await fs.promises.writeFile(filePath, file.buffer);
  
//         console.log("Image saved successfully:", filePath);
  
//         const imagePath = `/imagesIsys/${fileName}`;
//         imagePaths.push(imagePath);
//       } catch (error) {
//         console.error("Error saving an image:", error);
//         return res.status(500).json({ error: "Image upload failed" });
//       }
//     }
  
//     // Insert image paths into the database one by one
//     const product_id = req.body.product_id;
//     const query = "INSERT INTO product_images (product_id, image_path) VALUES (?, ?)";
  
//     try {
//       for (const imagePath of imagePaths) {
//         await dataProducts.query(query, [product_id, imagePath]);
//       }
  
//       res.status(200).json({ message: "Images uploaded and saved successfully" });
//     } catch (error) {
//       console.error("Error inserting image paths into the database:", error);
//       return res
//         .status(500)
//         .json({ error: "Image upload and database update failed" });
//     }
//   };
  
  

  

// router.post('/upload', uploadMultiple,addProduct)



// router.get('/images/:product_id', async (req, res) => {
//     const product_id = req.params.product_id;
//     console.log("Product ID:", product_id); // Add this line for debugging
    
//     const query = "SELECT image_path FROM product_images WHERE product_id = ?";
//     dataProducts.query(query, [product_id], (error, results) => {
//       if (error) {
//         console.error("Error executing query:", error); // Log any query execution errors
//         return res.status(500).json({ error: "Database query failed" });
//       }
    
//       console.log("Query results:", results); // Log the query results for debugging
    
//       if (results.length === 0) {
//         console.log("No results found for product_id:", product_id);
//         return res.status(404).json({ error: "No results found for product_id" });
//       }
    
  
//     try {
//     //   const results = await dataProducts.query(query, [product_id]);
      
//       if (!Array.isArray(results)) {
//         // Handle the case where no results are found
//         console.log("No results found for product_id:", product_id);
//         res.status(200).json({ status: 'success', images: [] });
//         return;
//       }
      
//       // Extract image paths from the results
//       const imagePaths = results.map(result => result.image_path);
  
//       // Return the image paths in the response
//       res.status(200).json({ status: 'success', images: imagePaths });
//     } catch (error) {
//       console.error("Error retrieving image paths:", error);
//       res.status(500).json({ status: 'error', message: 'Failed to retrieve image paths' });
//     }
//   }) 
// })
  

  
  

// module.exports = router
const express = require('express');
const router = express.Router();
const multer = require('multer');
const dataProducts = require("../Module/allData"); // Import your database connection
const storage = multer.memoryStorage(); // Store the image in memory
const upload = multer({ storage });

const fs = require('fs');
const path = require('path');


const uploadMultiple = (req, res, next) => {
   
   
    upload.array('image')(req, res, (err) => {
      if (err) {
        console.error('Error uploading images:', err);
        return res.status(500).json({ error: 'Image upload failed' });
      }
      next();
    });
  };


  addProduct = async (req, res) => {
    // const uploadDirectory = 'C:/Users/orana/OneDrive/سطح المكتب/imagesIsys';
    const uploadDirectory = path.join(__dirname, '..', 'imagesists');
    const imagePaths = [];
  
    for (const file of req.files) {
      const fileName = file.originalname;
      const filePath = path.join(uploadDirectory, fileName);
  
      try {
        await fs.promises.writeFile(filePath, file.buffer);
  
        console.log("Image saved successfully:", filePath);
  
        const imagePath = `imagesists/${fileName}`;
        imagePaths.push(imagePath);
      } catch (error) {
        console.error("Error saving an image:", error);
        return res.status(500).json({ error: "Image upload failed" });
      }
    }
  
    // Insert image paths into the database one by one
    const product_id = req.body.product_id;
    const query = "INSERT INTO product_images (product_id, image_path) VALUES (?, ?)";
  
    try {
      for (const imagePath of imagePaths) {
        await dataProducts.query(query, [product_id, imagePath]);
      }
  
      res.status(200).json({ message: "Images uploaded and saved successfully" });
    } catch (error) {
      console.error("Error inserting image paths into the database:", error);
      return res
        .status(500)
        .json({ error: "Image upload and database update failed" });
    }
  };
  
  

  

router.post('/upload', uploadMultiple,addProduct)





// Update an existing image associated with a product
router.put('/images/:product_id/:id', async (req, res) => {
  const product_id = req.params.product_id;
  const image_id = req.params.id;
  const newImagePath = req.body.image_path; // This should be provided in the request body
  const newImageData = req.body.image_data; // This should contain the new image data in base64 format

  // Check if the product and image exist
  const productQuery = "SELECT * FROM products WHERE p_id = ?";
  const imageQuery = "SELECT * FROM product_images WHERE product_id = ? AND id = ?";

  try {
    const [productResult] = await dataProducts.query(productQuery, [product_id]);

    if (!productResult) {
      return res.status(404).json({ error: "Product not found" });
    }

    const [imageResult] = await dataProducts.query(imageQuery, [product_id, image_id]);

    if (!imageResult) {
      return res.status(404).json({ error: "Image not found" });
    }

    // Update the image path in the database
    const updateImagePathQuery = "UPDATE product_images SET image_path = ? WHERE product_id = ? AND id = ?";
    await dataProducts.query(updateImagePathQuery, [newImagePath, product_id, image_id]);

    // If the image file needs to be updated as well, save the new image file
    const uploadDirectory = path.join(__dirname, '..', 'imagesists');
    const fileName = path.basename(newImagePath);
    const filePath = path.join(uploadDirectory, fileName);

    // Convert base64 image data to a buffer
    const imageDataBuffer = Buffer.from(newImageData, 'base64');

    // Save the new image file
    await fs.promises.writeFile(filePath, imageDataBuffer);

    res.status(200).json({ message: "Image updated successfully" });
  } catch (error) {
    console.error("Error updating image:", error);
    res.status(500).json({ error: "Image update failed" });
  }
});




// Delete an existing image associated with a product
router.delete('/images/:product_id/:id', async (req, res) => {
  const product_id = req.params.product_id;
  const image_id = req.params.id;

  // Check if the product and image exist
  const productQuery = "SELECT * FROM products WHERE product_id = ?";
  const imageQuery = "SELECT * FROM product_images WHERE product_id = ? AND id = ?";

  try {
    const [productResult] = await dataProducts.query(productQuery, [product_id]);

    if (!productResult) {
      return res.status(404).json({ error: "Product not found" });
    }

    const [imageResult] = await dataProducts.query(imageQuery, [product_id, image_id]);

    if (!imageResult) {
      return res.status(404).json({ error: "Image not found" });
    }

    // Delete the image from the database
    const deleteQuery = "DELETE FROM product_images WHERE product_id = ? AND id = ?";
    await dataProducts.query(deleteQuery, [product_id, image_id]);

    res.status(200).json({ message: "Image deleted successfully" });
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({ error: "Image deletion failed" });
  }
});





router.get('/images/:product_id', async (req, res) => {
    const product_id = req.params.product_id;
    console.log("Product ID:", product_id); // Add this line for debugging
    
    const query = "SELECT image_path FROM product_images WHERE product_id = ?";
    dataProducts.query(query, [product_id], (error, results) => {
      if (error) {
        console.error("Error executing query:", error); // Log any query execution errors
        return res.status(500).json({ error: "Database query failed" });
      }
    
      console.log("Query results:", results); // Log the query results for debugging
    
      if (results.length === 0) {
        console.log("No results found for product_id:", product_id);
        return res.status(404).json({ error: "No results found for product_id" });
      }
    
  
    try {
    //   const results = await dataProducts.query(query, [product_id]);
      
      if (!Array.isArray(results)) {
        // Handle the case where no results are found
        console.log("No results found for product_id:", product_id);
        res.status(200).json({ status: 'success', images: [] });
        return;
      }
      
      // Extract image paths from the results
      const imagePaths = results.map(result => result.image_path);
  
      // Return the image paths in the response
      res.status(200).json({ status: 'success', images: imagePaths });
    } catch (error) {
      console.error("Error retrieving image paths:", error);
      res.status(500).json({ status: 'error', message: 'Failed to retrieve image paths' });
    }
  }) 
})
  

router.get('/allimages', async (req, res) => {
  const query = "SELECT * FROM product_images";
  dataProducts.query(query, (error, results) => {
    if (error) {
      console.error("Error executing query:", error);
      return res.status(500).json({ error: "Database query failed" });
    }

    console.log("Query results:", results);

    try {
      if (!Array.isArray(results)) {
        console.log("No results found");
        res.status(200).json({ status: 'success', images: [] });
        return;
      }

      // Extract image paths from the results
      const imagePaths = results.map(result => result.image_path);

      // Return the image paths in the response
      res.status(200).json({ status: 'success', images: imagePaths });
    } catch (error) {
      console.error("Error retrieving image paths:", error);
      res.status(500).json({ status: 'error', message: 'Failed to retrieve image paths' });
    }
  });
});


  

module.exports = router