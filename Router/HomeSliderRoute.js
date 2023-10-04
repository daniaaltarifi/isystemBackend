const express = require('express');
const router = express.Router();
const HomeSlider = require("../Controller/HomeSliderController")

const multer = require('multer');
const dataProducts = require("../Module/allData"); // Import your database connection
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const destinationPath = path.join(__dirname, '..', 'imagesists'); // Destination folder
    cb(null, destinationPath);
  },
  filename: (req, file, cb) => {
    // Use the original filename to save the file
    cb(null, file.originalname);
  },
});


// Create the multer instance
const upload = multer({ storage: storage });

router.post('/add', upload.single('image_slider'), async (req, res) => {
  const { image_slider } = req.body;

  // Check if a file was uploaded
  if (!req.file) {
    return res.status(400).json({ error: 'Missing CV file' });
  }

  const image_path = 'imagesists/' + req.file.filename; // Get the relative path

  dataProducts.query(
    'INSERT INTO home_slider (image_slider) VALUES (?)',
    [image_path],
    (error, results) => {
      if (error) {
        console.error(error);
        // Handle the error
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        console.log('home_slider added successfully');
        // You can access the inserted ID using results.insertId
        res.status(200).json({ message: 'home_slider added successfully' });
      }
    }
  );
});


router.put('/edit/:id', async (req, res) => {
  const itemId = req.params.id;
  const file = req.file;
    console.log(itemId);
  console.log(req.body);
 // The rest of your code remains the same
 // Use req.file for single file upload

 if (!file) {
   return res.status(400).json({ error: 'HomeSlider not authenticated' });
 }


 
 const uploadDirectory = path.join(__dirname, '..', 'imagesists');
 const fileName = file.originalname;
 const filePath = path.join(uploadDirectory, fileName);


 try {
  await fs.promises.writeFile(filePath, file.buffer);
  console.log("Image saved successfully:", filePath);

  const imagePath = `imagesists/${fileName}`;

  dataProducts.query(
    'UPDATE `home_slider` SET image_slider = ? WHERE id = ?',
    [imagePath, itemId],
    (error, results) => {
      if (error) {
        console.error("Error updating image path in the database:", error);
        res.status(500).json({ error: "Image update and database update failed" });
      } else {
        console.log('Profile image updated successfully');
        res.status(200).json({ message: 'Profile image updated successfully' });
      }
    }
  );
} catch (error) {
  console.error("Error saving an image:", error);
  return res.status(500).json({ error: "Image upload failed" });
}
});

router.delete('/delete/:id', async (req, res) => {
  const itemId = req.params.id;
      console.log(itemId);

  dataProducts.query(
      'DELETE FROM `home_slider` WHERE id = ?',
      [itemId],
      (error, results) => {
          if (error) {
              console.error(error);
              // Handle the error
              res.status(500).json({ error: 'Internal Server Error' });
          } else {
              console.log('home_slider deleted successfully');
              res.status(200).json({ message: 'home_slider deleted successfully' });
          }
      }
  );
});

router.get('/gethomeslider' ,(req, res) => {

  const query = 'SELECT * FROM home_slider';
  dataProducts.query(query, (err, results) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json(results);
  });
}
)



router.get('/gethomeslider/:id', (req, res) => {
    const itemId = req.params.id;
    
    // Fetch the file path from the database based on the provided ID
    dataProducts.query(
      'SELECT image_slider FROM home_slider WHERE id = ?',
      [itemId],
      (err, results) => {
        if (err) {
          console.error('Error executing SQL query:', err);
          res.status(500).json({ error: 'Internal server error' });
          return;
        }
  
        if (results.length === 0) {
          res.status(404).json({ error: 'File not found' });
          return;
        }
  
        const filePath = results[0].image_slider;
  
        // Send the file for download
        res.download(filePath);
      }
    );
  });
  


module.exports = router