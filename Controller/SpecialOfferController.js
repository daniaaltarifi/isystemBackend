

const express = require('express');
const router = express.Router();
const multer = require('multer');
const dataProducts = require("../Module/allData"); // Import your database connection
const storage = multer.memoryStorage(); // Store the image in memory
const upload = multer({ storage });

const fs = require('fs');
const path = require('path');

addSpecial_offers = async (req, res) => {
  // const uploadDirectory = path.join(__dirname, '..', 'imagesists');

  // Check if there is a file uploaded
  // if (!req.file) {
  //     return res.status(400).json({ error: 'No image uploaded' });
  // }

  // const file = req.file;
  // const fileName = file.originalname;
  // const filePath = path.join(uploadDirectory, fileName);

  try {


      const product_id = req.body.product_id;
      const query = 'INSERT INTO special_offers (product_id) VALUES (?)';
          await dataProducts.query(query, [product_id]);

          res.status(200).json({ message: "offer uploaded and saved successfully" });
    
  } catch (error) {
      console.error("Error saving the offer:", error);
      return res.status(500).json({ error: "offer upload failed" });
  }
};

router.post('/add', addSpecial_offers);







const editSpecial_offers = async (req, res) => {
    const itemId = req.params.id;
    const { product_id } = req.body;
  
    if (!product_id) {
        return res.status(400).json({ error: 'Missing parameters in the request body' });
    }
    
            dataProducts.query(
                'UPDATE special_offers SET product_id = ? WHERE id = ?',
                [product_id, itemId],
                (error, results) => {
                    if (error) {
                        console.error(error);
                        // Handle the error
                        res.status(500).json({ error: 'Internal Server Error' });
                    } else {
                        console.log('Item updated successfully');
                        res.status(200).json({ message: 'Item updated successfully' });
                    }
                }
            );
      
            // If no new image is uploaded, update the database with the new product_id only
        dataProducts.query(
            'UPDATE special_offers SET product_id = ? WHERE id = ?',
            [product_id, itemId],
            (error, results) => {
                if (error) {
                    console.error(error);
                    // Handle the error
                    res.status(500).json({ error: 'Internal Server Error' });
                } else {
                    console.log('Item updated successfully (no new image)');
                    res.status(200).json({ message: 'Item updated successfully' });
                }
            }
        );
    }
  
  
  
  // Define the route for editing a top-selling item
  router.put('/edit/:id', editSpecial_offers);
  
  

    deleteSpecial_offers = async (req, res) => {
        const itemId = req.params.id;
            console.log(itemId);
    
        dataProducts.query(
            'DELETE FROM special_offers WHERE id = ?',
            [itemId],
            (error, results) => {
                if (error) {
                    console.error(error);
                    // Handle the error
                    res.status(500).json({ error: 'Internal Server Error' });
                } else {
                    console.log('Item deleted successfully');
                    res.status(200).json({ message: 'Item deleted successfully' });
                }
            }
        );
    }

    router.delete('/delete/:id', deleteSpecial_offers);




    const getSpecial_offers = (req, res) => {
      const query = 'SELECT so.*, p.* FROM special_offers so JOIN products p ON so.product_id = p.p_id';
    
      dataProducts.query(query, (err, results) => {
        if (err) {
          console.error("Error executing SQL query:", err);
          res.status(500).json({ error: "Internal server error" });
          return;
        }
    
        const promises = results.map((item) => {
          return new Promise((resolve, reject) => {
            const query_image = "SELECT * FROM product_images WHERE product_id = ?";
            dataProducts.query(query_image, [item.product_id], (err, images) => {
              if (err) {
                console.error("Error executing SQL query:", err);
                reject(err);
              } else {
                item.images = images;
                resolve(item);
              }
            });
          });
        });
    
        Promise.all(promises)
          .then((completeResults) => {
            res.json(completeResults);
          })
          .catch((error) => {
            console.error("Error fetching product images:", error);
            res.status(500).json({ error: "Internal server error" });
          });
      });
    };
    
    router.get('/getspecialoffers', getSpecial_offers);
    

  

        const getSpecial_offersByProductid  = (req, res) => {
          const itemId = req.params.id;
          console.log(itemId);
    
            const query = 'SELECT main_image FROM special_offers WHERE product_id = ? ';
            dataProducts.query(query ,
              [itemId], (err, results) => {
              if (err) {
                console.error('Error executing SQL query:', err);
                res.status(500).json({ error: 'Internal server error' });
                return;
              }
              res.json(results);
            });
          }
          
          router.get('/getspecialoffersbyproductid/:id', getSpecial_offersByProductid);
    
    
    
    

    
          const getSpecial_offersById = (req, res) => {
            const itemId =  req.params.id ;
          
            const query = 'SELECT * FROM special_offers  WHERE id = ?'
          
            dataProducts.query(query ,
            [itemId], (err, results) => {
              if (err) {
                console.error('Error executing SQL query:', err);
                res.status(500).json({ error: 'Internal server error' });
                return;
              }
              
               console.log(results);
               res.status(200).json({ results });
            });
          }
    
          router.get('/getspecialoffersbyid/:id', getSpecial_offersById);
    
    
      
      module.exports = router;


// module.exports = { editTopSelling , deleteTopSelling , getTopSelling , getTopSellingById }