const express = require('express');
const router = express.Router();
const multer = require('multer');

const blogDetails = require("../Controller/BlogsController");
const connection = require("../Module/allData");
const dataProducts = require("../Module/allData"); // Import your database connection
const storage = multer.memoryStorage(); // Store the image in memory
const upload = multer({ storage });

const fs = require('fs');
const path = require('path');

router.post('/add', upload.single('image_blog'), async (req, res) => { // Use upload.single('file') to handle the file upload
    const uploadDirectory = path.join(__dirname, '..', 'imagesists'); // Update the folder name

    try {
        const file = req.file;
        if (!file) {
            return res.status(400).json({ error: 'No image provided' });
        }

        const title = req.body.title;
        const date = req.body.date;
        const details = req.body.details;

        // Generate a unique filename to avoid overwriting existing images
        const uniqueFileName = file.originalname;

        const image_blog = path.join(uploadDirectory, uniqueFileName);

        // Save the image to the "imagesists" folder
        fs.writeFileSync(image_blog, file.buffer);
        const imagePath = `imagesists/${uniqueFileName}`;

        // Assuming dataProducts.query returns a Promise
        await dataProducts.query(
            'INSERT INTO blogs (title, date, image_blog, details) VALUES (?, ?, ?, ?)',
            [title, date, imagePath, details]
        );

        console.log('Blog added successfully');
        res.status(200).json({ message: 'Blog added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put("/edit/:id", upload.single('image_blog'), async (req, res) => {
    try {
        const itemId = req.params.id;
        const { title, date, details } = req.body;

        // Check if a new image is provided
        let imagePath = req.body.image_blog; // Default to the existing image path
        if (req.file) {
            // If a new image is provided, update the image path
            const uploadDirectory = path.join(__dirname, '..', 'imagesists');
            const uniqueFileName = req.file.originalname;
            const newImageBlog = path.join(uploadDirectory, uniqueFileName);

            // Save the new image to the "imagesists" folder
            fs.writeFileSync(newImageBlog, req.file.buffer);
            imagePath = `imagesists/${uniqueFileName}`;
        }

        // Assuming dataProducts.query returns a Promise
        await dataProducts.query(
            'UPDATE blogs SET title = ?, date = ?, image_blog = ?, details = ? WHERE id_blogs = ?',
            [title, date, imagePath, details, itemId]
        );

        console.log('Blog updated successfully');
        res.status(200).json({ message: 'Blog updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.delete("/delete/:id", blogDetails.deleteBlog);



router.get('/data', blogDetails.getBlog)

router.get('/data/:id_blogs', blogDetails.getBlogById)


module.exports = router