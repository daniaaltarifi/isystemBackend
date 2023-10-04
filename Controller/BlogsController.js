const express = require('express');
const router = express.Router();
const multer = require('multer');
const dataProducts = require("../Module/allData"); // Import your database connection
// const storage = multer.memoryStorage(); // Store the image in memory
// const upload = multer({ storage });

// const fs = require('fs');
// const path = require('path');

// const addBlog = async (req, res) => {
//   const uploadDirectory = path.join(__dirname, '..', 'imagesists'); // Update the folder name

//   try {
//     const file = req.file;
//     if (!file) {
//       return res.status(400).json({ error: 'No image provided' });
//     }

//     const title = req.body.title;
//     const date = req.body.date;
//     const details = req.body.details;

//     // Generate a unique filename to avoid overwriting existing images
//     const uniqueFileName = Date.now() + '-' + file.originalname;
//     const image_blog = path.join(uploadDirectory, uniqueFileName);

//     // Save the image to the "assistimag" folder
//     fs.writeFileSync(image_blog, file.buffer);

//     // Assuming dataProducts.query returns a Promise
//     await dataProducts.query(
//       'INSERT INTO blogs (title, date, image_path, details) VALUES (?, ?, ?, ?)',
//       [title, date, uniqueFileName, details] // Use the correct field name for the image path
//     );

//     console.log('Blog added successfully');
//     res.status(200).json({ message: 'Blog added successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };


const editBlog = async (req, res) => {
  try {
    const itemId = req.params.id;
    const { title, date, image_blog , details } = req.body;
    // const imageBuffer = req.file.buffer;

    // Assuming dataProducts.query returns a Promise
    await dataProducts.query(
      'UPDATE blogs SET title = ?, date = ?, image_blog = ? , details = ? WHERE id_blogs = ?',
      [title, date,image_blog , details, itemId]
    );

    console.log('Blog updated successfully');
    res.status(200).json({ message: 'Blog updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const itemId = req.params.id;

    
    await dataProducts.query(
      'DELETE FROM blogs WHERE id_blogs = ?',
      [itemId]
    );

    console.log('Blog deleted successfully');
    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



const getBlog = (req, res) => {

  const query = 'SELECT  *  FROM blogs';
  dataProducts.query(query, (err, results) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json(results);
  });
}

const getBlogById = (req, res) => {
  const itemId = req.params.id_blogs;
  const query = 'SELECT * FROM blogs WHERE id_blogs = ?';

  dataProducts.query(query, [itemId], (err, results) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    if (results.length === 0) {
      console.error('No matching blog entry found.');
      res.status(404).json({ error: 'Blog not found' });
      return;
    }

    console.log('Blog entry retrieved:', results[0]);
    res.status(200).json(results[0]);
  });
};



// const getBlogById = (req, res) => {
//   const itemId =  req.params.id ;

//   const query = 'SELECT *  FROM blogs WHERE id_blogs = ?'

//   dataProducts.query(query ,
//   [itemId], (err, results) => {
//     if (err) {
//       console.error('Error executing SQL query:', err);
//       res.status(500).json({ error: 'Internal server error' });
//       return;
//     }
    
//      console.log(results);
//      res.status(200).json( results );
//   });
// }




module.exports = { editBlog, deleteBlog, getBlog, getBlogById};