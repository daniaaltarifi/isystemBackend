const dataProducts = require("../Module/allData"); 




editHomeSliderById = async (req, res) => {
    const itemId = req.params.id;
    const {image_slider} = req.body;
    console.log(itemId);
   // The rest of your code remains the same
   const file = req.file; // Use req.file for single file upload
  
   if (!image_slider) {
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
};
  





        deleteHomeSlider = async (req, res) => {
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
      }



          
    const getHomeSlider  = (req, res) => {

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
    




        module.exports = { editHomeSliderById  , deleteHomeSlider , getHomeSlider };