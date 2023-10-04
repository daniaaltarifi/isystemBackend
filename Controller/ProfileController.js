const dataProducts = require("../Module/allData"); 


// addProfile = async (req, res) => {
// add to router 
// }

// editProfileUserid = async (req, res) => {
// add to router 
// }




editProfileUserAndImgById = async (req, res) => {
    const itemId = req.params.id;
    const { user_id , profile_imge } = req.body;
    console.log(itemId);
   // The rest of your code remains the same
   const file = req.file; // Use req.file for single file upload
  
   if (!user_id) {
     return res.status(400).json({ error: 'User not authenticated' });
   }
 
   if (!file) {
     return res.status(400).json({ error: 'No file uploaded' });
   }
 
   
   const uploadDirectory = path.join(__dirname, '..', 'imagesists');
   const fileName = file.originalname;
   const filePath = path.join(uploadDirectory, fileName);
 
  
   try {
    await fs.promises.writeFile(filePath, file.buffer);
    console.log("Image saved successfully:", filePath);

    const imagePath = `imagesists/${fileName}`;

    dataProducts.query(
      'UPDATE `profile` SET user_id = ?, profile_imge = ? WHERE id = ?',
      [user_id , imagePath, itemId],
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
  





        deleteProfile = async (req, res) => {
          const itemId = req.params.id;
              console.log(itemId);
      
          dataProducts.query(
              'DELETE FROM `profile` WHERE id = ?',
              [itemId],
              (error, results) => {
                  if (error) {
                      console.error(error);
                      // Handle the error
                      res.status(500).json({ error: 'Internal Server Error' });
                  } else {
                      console.log('order deleted successfully');
                      res.status(200).json({ message: 'order deleted successfully' });
                  }
              }
          );
      }



          
    const getProfile  = (req, res) => {

      const query = 'SELECT * FROM profile';
      dataProducts.query(query, (err, results) => {
        if (err) {
          console.error('Error executing SQL query:', err);
          res.status(500).json({ error: 'Internal server error' });
          return;
        }
        res.json(results);
      });
    }
    



    
    const getProfileByUser = (req, res) => {
      const itemId =  req.params.user_id ;
    console.log(itemId);
      const query = 'SELECT * FROM profile  WHERE user_id = ?'
    
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


    const getProfileById = (req, res) => {
      const itemId =  req.params.id ;
    
      const query = 'SELECT * FROM profile  WHERE id  = ?'
    
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
    

        module.exports = { editProfileUserAndImgById  , deleteProfile , getProfile , getProfileByUser, getProfileById };